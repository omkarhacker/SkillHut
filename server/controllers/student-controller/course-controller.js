const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    console.log(req.query, "req.query");

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;

        break;
      case "price-hightolow":
        sortParam.pricing = -1;

        break;
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParam);

    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { courseId, studentId } = req.params; // Destructure the parameters
    console.log("Received courseId:", courseId);
    console.log("Received studentId:", studentId);

    // Find student courses based on studentId
    const studentCourses = await StudentCourses.findOne({
      userId: studentId,
    });
    console.log("Student Courses:", studentCourses); // Log for debugging

    // Check if studentCourses exists and has a 'courses' property
    if (!studentCourses || !studentCourses.courses) {
      return res.status(200).json({
        success: false,
        message: "Student not found or no purchased courses",
      });
    }

    // Check if the current course is purchased
    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseId === courseId) > -1;

    // Respond with success and purchase status
    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse, // This will be true or false
    });
  } catch (e) {
    console.error("Error occurred:", e); // Use console.error for error logging
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};




module.exports = {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo,
};
