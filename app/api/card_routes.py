from flask import Blueprint, request
from app.models import Workspace, User, members, List, db, Card

card_routes = Blueprint('cards', __name__)

@card_routes.route('/<int:id>')
def cards(id):
    cards = Card.query.filter(Card.workspace_id == id).all()
    return {'cards': [card.to_dict() for card in cards]}
