"""create tables

Revision ID: 0821e7554ede
Revises:
Create Date: 2022-07-06 09:15:10.198794

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0821e7554ede'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('profile_image', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('first_name'),
    sa.UniqueConstraint('last_name')
    )
    op.create_table('workspaces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('labels', sa.String(length=2000), nullable=False),
    sa.Column('background', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('workspace_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['workspace_id'], ['workspaces.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('members',
    sa.Column('users', sa.Integer(), nullable=False),
    sa.Column('workspaces', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users'], ['users.id'], ),
    sa.ForeignKeyConstraint(['workspaces'], ['workspaces.id'], ),
    sa.PrimaryKeyConstraint('users', 'workspaces')
    )
    op.create_table('cards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('list_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('description', sa.String(length=2000), nullable=True),
    sa.Column('image', sa.String(length=2000), nullable=True),
    sa.Column('labels', sa.String(length=2000), nullable=True),
    sa.Column('members', sa.String(length=2000), nullable=True),
    sa.Column('due_date', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cards')
    op.drop_table('members')
    op.drop_table('lists')
    op.drop_table('workspaces')
    op.drop_table('users')
    # ### end Alembic commands ###
