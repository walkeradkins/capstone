
from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CardForm(FlaskForm):
    name = StringField('title', validators=[DataRequired()])
    description = StringField('title')
    list_id = IntegerField('list_id', validators=[DataRequired()])
    index = StringField('index')
    image = StringField('image')
    labels = StringField('labels')
    workspace_id = IntegerField('workspace_id', validators=[DataRequired()])
    created_at = StringField('created_at', validators=[DataRequired()])
    due_date = StringField('due_date')