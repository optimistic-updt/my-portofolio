import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import { projects } from "@/libs/db/schema/resources";
import { eq } from "drizzle-orm";

// GET all projects
export async function GET() {
  try {
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// POST a new project
export async function POST(request: Request) {
  try {
    const { title, description, imageUrl, projectUrl } = await request.json();

    // Validate inputs
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 },
      );
    }

    // Insert new project
    const newProject = await db
      .insert(projects)
      .values({
        title,
        description,
        imageUrl,
        projectUrl,
      })
      .returning();

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
