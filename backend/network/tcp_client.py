import socket
import json


def receive_response_from_server_tcp(ip_addr, port, client_data):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_addr = (ip_addr, port)
    s.connect(server_addr)

    # Serialize to JSON string
    message = json.dumps(client_data).encode("utf-8")
    s.send(message)

    data = s.recv(5000)
    return data.decode("utf-8")
