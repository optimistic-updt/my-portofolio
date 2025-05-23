import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import { projects } from "@/libs/db/schema/resources";
import { eq } from "drizzle-orm";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET a specific project by ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const project = await db.select().from(projects).where(eq(projects.id, id));

    if (project.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project[0]);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 },
    );
  }
}

// PUT/UPDATE a specific project
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const { title, description, imageUrl, projectUrl } = await request.json();

    // Validate inputs
    if (!title && !description && !imageUrl && !projectUrl) {
      return NextResponse.json(
        { error: "At least one field must be provided for update" },
        { status: 400 },
      );
    }

    // Prepare update data
    const updateData: Partial<typeof projects.$inferInsert> = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (projectUrl) updateData.projectUrl = projectUrl;

    // Add updatedAt timestamp
    updateData.updatedAt = new Date();

    // Update project
    const updatedProject = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();

    if (updatedProject.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE a specific project
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const deletedProject = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();

    if (deletedProject.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
