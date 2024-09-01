// src/lib/ability.ts
import { PureAbility, AbilityBuilder } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { User, Post } from '@prisma/client';

type AppAbility = PureAbility<[string, Subjects<{
  User: User,
  Post: Post
}>], PrismaQuery>;

export function defineAbilityFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else if (user.role === 'user') {
    can('read', 'Post');
    can('create', 'Post');
    can('update', 'Post', { authorId: user.id });
    can('delete', 'Post', { authorId: user.id });
  }

  return build();
}