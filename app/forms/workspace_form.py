from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class WorkspaceForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    labels = StringField('labels', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])
