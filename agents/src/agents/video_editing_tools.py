import datetime
import os
import tempfile
from agents.utils.gcs_url_converters import public_url_to_gcs_uri, get_blob_name_from_gcs_uri
from dotenv import load_dotenv
import moviepy as mp
from google.genai import Client
from google.cloud import storage


load_dotenv()

client = Client(
    vertexai=True,
    project=os.getenv("GOOGLE_CLOUD_PROJECT"),
    location=os.getenv("GOOGLE_CLOUD_LOCATION"),
)

# Initialize Google Cloud Storage client
storage_client = storage.Client(project=os.getenv("GOOGLE_CLOUD_PROJECT"))
GCS_BUCKET_NAME = "smba-assets"  # Public to internet


def download_file_from_gcs(source_blob_name: str, destination_file_name: str):
    """
    Downloads a file from Google Cloud Storage.

    Args:
        bucket_name (str): The name of the GCS bucket.
        source_blob_name (str): The name of the blob in the bucket.
        destination_file_name (str): The local path where the file will be saved.
    """
    bucket = storage_client.bucket(GCS_BUCKET_NAME)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)
    print(
        f"Downloaded gs://{GCS_BUCKET_NAME}/{source_blob_name} to {destination_file_name}.")


def merge_audio_to_video(
    video_path: str, audio_path: str, output_path: str
):
    """
    Merges audio into a soundless video file.

    Args:
        video_path (str): Path to the input video file.
        audio_path (str): Path to the input audio file.
        output_path (str): Path where the output video with audio will be saved.
    """

    video_clip = mp.VideoFileClip(video_path)
    audio_clip = mp.AudioFileClip(audio_path)

    # Get durations of video and audio
    video_duration = video_clip.duration
    audio_duration = audio_clip.duration

    # If their length doesn't match, scale the video speed.
    if abs(video_duration - audio_duration) > 0.1:
        video_speed_factor = video_duration / audio_duration
        video_clip = video_clip.with_speed_scaled(video_speed_factor)

    # Attach the audio to the video
    video_clip = video_clip.with_audio(audio_clip)

    # Export the final video with sound
    video_clip.write_videofile(output_path, codec="libx264", audio_codec="aac")


def assemble_video_with_audio(video_gcs_public_url: str, audio_gcs_public_url: str):
    """
    Assembles a video with audio so it has sound. Both video and audio are downloaded from Google Cloud Storage.

    Args:
        video_gcs_public_url (str): GCS public URL of the input video file.
        audio_gcs_public_url (str): GCS public URL of the input audio file.
    """
    # Download files from GCS
    tmp_dir = tempfile.gettempdir()
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    video_path = os.path.join(tmp_dir, f"temp_video_{timestamp}.mp4")
    audio_path = os.path.join(tmp_dir, f"temp_audio_{timestamp}.wav")

    try:
        download_file_from_gcs(get_blob_name_from_gcs_uri(
            public_url_to_gcs_uri(video_gcs_public_url)), video_path)
        download_file_from_gcs(get_blob_name_from_gcs_uri(
            public_url_to_gcs_uri(audio_gcs_public_url)), audio_path)
    except Exception as e:
        print(f"Failed to download files from GCS: {e}")
        return {"status": "failed", "detail": f"Download failed: {e}"}

    # Merge audio to video
    output_path = os.path.join(tmp_dir, f"video_with_audio_{timestamp}.mp4")
    merge_audio_to_video(video_path, audio_path, output_path)

    # Upload the final video back to GCS
    try:
        bucket = storage_client.bucket(GCS_BUCKET_NAME)
        blob = bucket.blob(f"videos/{os.path.basename(output_path)}")
        blob.upload_from_filename(output_path, content_type="video/mp4")

        return {
            "status": "success",
            "detail": "Video with audio generated and uploaded to GCS",
            "video_url": blob.public_url,
        }
    except IOError as e:
        print(f"Failed to upload video with audio to GCS: {e}")
    finally:
        os.remove(video_path)
        os.remove(audio_path)
        os.remove(output_path)


if __name__ == "__main__":
    # Example usage
    # merge_audio_to_video(
    #     video_path="generated_video/sample_0.mp4",
    #     audio_path="generated_audio/narration-audio.wav",
    #     output_path="generated_video/video_with_sound.mp4"
    # )
    status = assemble_video_with_audio(
        video_gcs_public_url="https://storage.googleapis.com/smba-assets/videos/11611916828487350363/sample_0.mp4",
        audio_gcs_public_url="https://storage.googleapis.com/smba-assets/audios/20250604_002905.wav"
    )
    print(status)
