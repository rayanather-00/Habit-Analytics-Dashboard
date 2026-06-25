from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")
@app.route("/statistics")
def statistics():
    return render_template("statistics.html")
@app.route("/documents")
def documents():
    return render_template("documents.html")
@app.route("/feed")
def feed():
    return render_template("feed.html")
@app.route("/expenses")
def expenses():
    return render_template("expenses.html") 
@app.route("/reviews")
def reviews():
    return render_template("reviews.html")
@app.route("/saved-links")
def saved_links():
    return render_template("saved-links.html")
@app.route("/learning")
def learning():
    return render_template("learning.html")
@app.route("/events")
def events():
    return render_template("events.html")
    


if __name__ == "__main__":
    app.run(debug=True)