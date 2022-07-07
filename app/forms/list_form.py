from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    workspace_id = IntegerField('owner_id', validators=[DataRequired()])
