export async function POST(request) {
    try {
      const body = await request.json();
      const { categoryName, metaTitle, metaDescription, h1Title, user } = body;
  
      // ✅ Server-side admin check
      if (!user || user.role !== "admin") {
        return NextResponse.json(
          { success: false, error: "Unauthorized. Admins only." },
          { status: 403 }
        );
      }
  
      await mongoose.connect(connectionStr);
  
      const category = new Category({
        categoryName,
        metaTitle,
        metaDescription,
        h1Title,
      });
  
      const savedCategory = await category.save();
      return NextResponse.json({ success: true, data: savedCategory });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }
  }
  