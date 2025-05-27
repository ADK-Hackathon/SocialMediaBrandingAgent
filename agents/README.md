# smba-backend

The backend API for the Social Media Branding Agent (SMBA) project, built using Google Agent Development Kit (ADK).


### Installation
1. **Make sure if poetry is installed for package management**
    ```bash
    pipx install poetry
    ```

2.  **Activate virtual environment (it is automatically created by poetry):**
    Doc: https://python-poetry.org/docs/basic-usage/#using-your-virtual-environment
    ```bash
    eval $(poetry env activate)
    ```

3.  **Install Dependencies:**
    ```bash
    poetry install
    ```

4. **Create .env file (under smba-backend folder)**
    ```bash
    cd agents
    touch src/agents/.env
    ```

    Fill the `.env` file with below content
    ```
    GOOGLE_GENAI_USE_VERTEXAI=FALSE
    GOOGLE_API_KEY=PASTE_YOUR_ACTUAL_API_KEY_HERE
    ```


### Running the Application

1.  **Ensure you are under the agents dir(contains the toml file) and virtual environment is activated.**
    ```bash
    eval $(poetry env activate)
    ```

2.  **Run the following command to launch the dev UI:**
    ```bash
    (cd src && adk web)
    ```

    You should see output similar to this:
    ```
    INFO:     Started server process [10282]
    INFO:     Waiting for application startup.
    +-----------------------------------------------------------------------------+
    | ADK Web Server started                                                      |
    | For local testing, access at http://localhost:8000.                         |
    +-----------------------------------------------------------------------------+
    INFO:     Application startup complete.
    INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
    ```

### Testing the Agent

Open your web browser to visit:

`http://localhost:8000`

Selet "smba-backend" agent > Type "https://x.com/elonmusk" in chat input > Enter

### Docker Build and Run

    ```bash
    # Build the image
    docker build -t agent-backend .

    # Run the container
    docker run -p 8080:8080 agent-backend
    ```