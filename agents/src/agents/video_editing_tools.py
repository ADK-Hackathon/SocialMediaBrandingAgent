import moviepy as mp


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


if __name__ == "__main__":
    # Example usage
    merge_audio_to_video(
        video_path="generated_video/sample_0.mp4",
        audio_path="generated_audio/narration-audio.wav",
        output_path="generated_video/video_with_sound.mp4"
    )
