// src/app/api/permissions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { defineAbilityFor } from '@/lib/ability';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // For testing, we'll use a hardcoded user. In a real app, you'd get this from the session.
    const user = await prisma.user.findFirstOrThrow({ where: { role: 'user' } });

    const ability = defineAbilityFor(user);

    const permissions = [
      { action: 'read', subject: 'Post' },
      { action: 'create', subject: 'Post' },
      { action: 'update', subject: 'Post' },
      { action: 'delete', subject: 'Post' },
      { action: 'manage', subject: 'all' },
    ].filter(permission => ability.can(permission.action, permission.subject as any));

    return NextResponse.json({ user: user.email, permissions });
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json({ error: 'Failed to fetch permissions' }, { status: 500 });
  }
}
