import socket
import json


def receive_response_from_server_udp(ip_addr, port, client_data):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_addr = (ip_addr, port)

    # Serialize to JSON string
    message = json.dumps(client_data).encode("utf-8")
    s.sendto(message, server_addr)

    data, addr = s.recvfrom(5000)
    return data.decode("utf-8")
