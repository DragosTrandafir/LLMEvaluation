import socket
from backend.network.server_decode_client_data_and_encode_processed_data import decode_encode
import os
from dotenv import load_dotenv

# .env variables
load_dotenv()

# Token
hf_token = os.getenv("HF_TOKEN")

UDP_SERVER_PORT = int(os.getenv("UDP_SERVER_PORT", 25560))

s = socket.socket(socket.AF_INET,  # Internet
                  socket.SOCK_DGRAM)  # UDP
s.bind(("0.0.0.0", UDP_SERVER_PORT))
print(f"Server listening on {UDP_SERVER_PORT}")

# 3. send back to client
while True:
    data_received_from_client, addr_received_from_client = s.recvfrom(5000)
    print(f"Received from {addr_received_from_client}: {data_received_from_client}")

    try:
        response_encoded = decode_encode(data_received_from_client, hf_token)

        s.sendto(response_encoded, addr_received_from_client)

    except Exception as e:
        error_msg = f"Error processing request: {e}"
        s.sendto(error_msg.encode(), addr_received_from_client)
