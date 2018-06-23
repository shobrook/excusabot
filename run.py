#########
# GLOBALS
#########


from bson.objectid import ObjectId
from flask import Flask, jsonify, request, json
from slackclient import SlackClient

app = Flask(__name__)
debug = True


########
# ROUTES
########


@app.route("/", methods=["GET"])
def index():
	return jsonify({"success": True})

@app.route("/send_excuse", methods=["POST"])
def send_excuse():
	slack_client = SlackClient(request.json["api_token"])

	msgs = {
		"0": "I'm going to be late this morning.",
		"1": "I have an appointment this morning.",
		"2": "I'm not feeling well this morning.",
		"3": "Slow morning today.",
		"4": "My streetcar hit a goat and exploded.",
		"5": "Having a personal emergency.",
		"6": "My pet chihuaha has gone missing."
	}

	msg = msgs[str(request.json["msg_id"])] + " ETA: " + request.json["eta"]
	response = slack_client.api_call(
		"chat.postMessage",
		channel="CBBQ9JK1N",
		text=msg
	)

	return jsonify({"success": response["ok"]})


######
# MAIN
######


if __name__ == "__main__":
	app.run(debug=debug)
