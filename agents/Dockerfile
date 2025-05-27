FROM python:3.13-slim
WORKDIR /app

# Install poetry
RUN pip install poetry

# Copy the entire project first
COPY . .

# Configure poetry to not use a virtual environment
RUN poetry config virtualenvs.create false

# Install dependencies
RUN poetry install --no-interaction --no-ansi

# Expose port
EXPOSE 8080

# Run the application
CMD ["poetry", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080"] 
