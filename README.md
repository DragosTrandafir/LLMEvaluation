This is an LLM evaluation app that used threads, udp servers and tcp servers to handle more LLM responses, and an evaluator LLM grades from 1-100 these responses. This is the .env file that I used, but please use your own Hugging Face token to be able to access the LLMs. 

Remark : some LLMs could not be available in the right moment you are testing this, because permissions on Hugging Face may have changed since I created this project. You can also change the ports however you like, but please keep the file paths the same in your configuration.

.env:

HF_TOKEN=<use your own token>
MODELS=Google/Gemma-2-9B-Instruct,Qwen/Qwen2.5-7B-Instruct,meta-llama/Llama-3.1-8B-Instruct,openai/gpt-oss-20b,EleutherAI/gpt-neo-2.7B
EVALUATOR_MODEL=mistralai/Mistral-7B-Instruct-v0.2


# TCP and UDP server addresses and ports
TCP_SERVER_IP=192.168.206.4
TCP_SERVER_PORT=25569
UDP_SERVER_IP=192.168.206.4
UDP_SERVER_PORT=25560

# File paths
RESPONSES_JSON_PATH="../data/responses.json"
SCORES_JSON_PATH="../data/scores.json"

# flask parameters
FLASK_HOST=0.0.0.0
FLASK_PORT=5000


How to run the project

First run the php file, but first change in the php file the path to Python inside the venv and the project root (for backend imports).

<img width="1212" height="156" alt="run1" src="https://github.com/user-attachments/assets/7e3b5832-4fa2-46b0-bced-ab87da153b8f" />


Then, run the python file from the IDE you use (I used Pycharm), but you can use any IDE that supports Python. 

<img width="591" height="129" alt="run2" src="https://github.com/user-attachments/assets/d4645598-efc1-4dd4-93c9-7c40a5cb4f92" />

Finally, I ran from WSL (Windows Subsystem for Linux) the frontend, you can do the same. 

<img width="1490" height="144" alt="run3" src="https://github.com/user-attachments/assets/b1764667-c194-459b-abf6-87c7bf768247" />


