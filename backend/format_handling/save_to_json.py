import json


# function that saves python object data into a json path file
def save_json_format(data, path):
    try:
        with open(path, 'w', encoding='utf-8') as f:  # open json file with write access
            json.dump(data, f, ensure_ascii=False,
                      indent=4)  # keep readable special characters and make the data more human-readable
        return True
    except Exception as e:
        print(f"Error saving JSON to {path}: {e}")
        return False
