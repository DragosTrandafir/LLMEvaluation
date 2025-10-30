from threading import Thread
import socket
from backend.network.server_decode_client_data_and_encode_processed_data import decode_encode
import os
from dotenv import load_dotenv

# .env variables
load_dotenv()

# Tokens
hf_token = os.getenv("HF_TOKEN")

TCP_SERVER_PORT = int(os.getenv("TCP_SERVER_PORT", 25569))

# start server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(("0.0.0.0", TCP_SERVER_PORT))
s.listen(5)
print(f"Server listening on port {TCP_SERVER_PORT}")


def client_connect_tcp(client_socket,index_client):
    data = client_socket.recv(5000)
    print(f"Am primit de la client {index_client}")
    try:
        response_encoded = decode_encode(data,hf_token)
        client_socket.send(response_encoded)
        client_socket.close()
    except Exception as e:
        error_msg = f"Error processing request: {e}"
        client_socket.sendto(error_msg.encode())


i = 0
while True:
    i += 1
    cs, addr = s.accept()
    print("Conectat:", addr)
    Thread(target=client_connect_tcp, args=(cs, i,), daemon=True).start()
