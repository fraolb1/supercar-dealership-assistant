# SuperCar Dealership

## Getting Started

Follow these steps to set up and run the project:

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- A [Groq](https://groq.com/) account

### Installation and Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/fraolb1/supercar-dealership-assistant.git
   cd supercar-dealership-assistant
   ```

2. **Create a Groq Account and Obtain an API Key**

   - Sign up at [Groq](https://groq.com/)
   - Retrieve your API key from the Groq dashboard

3. **Configure the Backend**

   - Navigate to the backend directory:
     ```sh
     cd backend
     ```
   - Open or create a `.env` file and add your Groq API key:
     ```sh
     echo "GROQ_API_KEY=<your-groq-api-key>" > .env
     ```

4. **Run the Application**

   - Navigate to the infrastructure directory:
     ```sh
     cd ../infrastructure
     ```
   - Start the application using Docker Compose:
     ```sh
     docker-compose up
     ```
