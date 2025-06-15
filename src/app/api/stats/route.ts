import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function GET() {
  try {
    // Get total tasks count
    const totalTasks = await prisma.task.count();

    // Get completed tasks count
    const completedTasks = await prisma.task.count({
      where: {
        completed: true,
      },
    });

    // Get total categories count
    const totalCategories = await prisma.category.count();

    // Get tasks by category
    const tasksByCategory = await prisma.category.findMany({
      select: {
        name: true,
        color: true,
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });

    // Get recent tasks (last 5)
    const recentTasks = await prisma.task.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({
      totalTasks,
      completedTasks,
      totalCategories,
      tasksByCategory,
      recentTasks,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
