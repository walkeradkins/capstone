from flask.cli import AppGroup
from app.models import db
from .users import seed_users, undo_users
# from .workspaces import seed_workspaces, undo_workspaces
from .lists import seed_lists, undo_lists
from .cards import seed_cards, undo_cards
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # seed_workspaces()
    seed_lists()
    seed_cards()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_workspaces()
    undo_lists()
    seed_cards()
    # Add other undo functions here


@seed_commands.command('clear')
def clear_data():
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print('Clear table %s' % table)
        db.session.execute(table.delete())
    db.session.commit()
