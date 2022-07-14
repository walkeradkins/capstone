"""unqiue off

Revision ID: 35d25b219472
Revises: 5f590e78d1a6
Create Date: 2022-07-14 17:22:42.803783

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35d25b219472'
down_revision = '5f590e78d1a6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('users_first_name_key', 'users', type_='unique')
    op.drop_constraint('users_last_name_key', 'users', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('users_last_name_key', 'users', ['last_name'])
    op.create_unique_constraint('users_first_name_key', 'users', ['first_name'])
    # ### end Alembic commands ###
