export type Language = "ar" | "en"

export interface Translations {
  // Common
  common: {
    login: string
    logout: string
    register: string
    dashboard: string
    save: string
    cancel: string
    delete: string
    edit: string
    create: string
    submit: string
    loading: string
    error: string
    success: string
    back: string
    next: string
    previous: string
    search: string
    filter: string
    reset: string
    close: string
    yes: string
    no: string
  }

  // Navigation
  nav: {
    dashboard: string
    users: string
    companies: string
    jobs: string
    browseJobs: string
    applications: string
    cv: string
    submissions: string
    adminDashboard: string
    resume: string
  }

  // Home Page
  home: {
    title: string
    platformTitle: string
    subtitle: string
    description: string
    forCompanies: string
    forJobSeekers: string
    features: string
    jobManagement: string
    jobManagementDesc: string
    multipleAssessments: string
    multipleAssessmentsDesc: string
    autoGrading: string
    autoGradingDesc: string
    cvBuilder: string
    cvBuilderDesc: string
    startJourney: string
    joinPlatform: string
    createFreeAccount: string
    allRightsReserved: string
  }

  // Auth
  auth: {
    login: string
    loginTitle: string
    loginDescription: string
    register: string
    registerTitle: string
    email: string
    password: string
    fullName: string
    companyName: string
    dontHaveAccount: string
    createNewAccount: string
    alreadyHaveAccount: string
    loginHere: string
    demoAccounts: string
    admin: string
    company: string
    candidate: string
    anyPassword: string
    emailOrPasswordIncorrect: string
    emailAlreadyUsed: string
    loginFailed: string
    registrationFailed: string
    loggingIn: string
    enterYourCredentials: string
    selectRole: string
    jobSeeker: string
  }

  // Dashboard
  dashboard: {
    welcome: string
    overview: string
    statistics: string
    recentActivity: string
    totalJobs: string
    activeJobs: string
    totalApplications: string
    pendingApplications: string
    totalCandidates: string
    totalSubmissions: string
    controlPanel: string
    welcomeMessage: string
    browseJobs: string
    addNewJob: string
    inProgress: string
    completed: string
    myRecentApplications: string
    recentJobs: string
    viewAll: string
    noApplicationsYet: string
    browseAvailableJobs: string
    totalApplicants: string
    noJobsYet: string
    startAddingJobs: string
    applicant: string
    applicants: string
  }

  // Jobs
  jobs: {
    title: string
    description: string
    requirements: string
    location: string
    type: string
    salary: string
    status: string
    active: string
    closed: string
    draft: string
    createJob: string
    editJob: string
    deleteJob: string
    noJobs: string
    apply: string
    viewDetails: string
    jobManagement: string
    createAndManageJobs: string
    noJobsAvailable: string
    checkBackLater: string
    requiresAssessment: string
    discoverOpportunities: string
    jobDetails: string
    industry: string
    size: string
  }

  // Assessments
  assessments: {
    title: string
    description: string
    timeLimit: string
    minutes: string
    passingScore: string
    createAssessment: string
    editAssessment: string
      sections: string
      questions: string
      startAssessment: string
      submitAssessment: string
      assessmentInfo: string
      assessmentTitle: string
      assessmentDescription: string
      timeLimitMinutes: string
      passingScoreRequired: string
      videoQuestion: string
      videoQuestionDesc: string
      startRecording: string
      stopRecording: string
      recorded: string
      reRecord: string
      videoSaved: string
      testCases: string
      testCasesOptional: string
      testCasesDescription: string
      testCasesExample: string
      input: string
      expectedOutput: string
      addTestCase: string
      manualReview: string
      allQuestionsRequired: string
      cannotEditAfterSubmit: string
    }

  // CV
  cv: {
    personalInfo: string
    education: string
    experience: string
    skills: string
    languages: string
    certifications: string
    summary: string
    phone: string
    address: string
    degree: string
    institution: string
    startDate: string
    endDate: string
    jobTitle: string
    company: string
    level: string
    name: string
    issuer: string
    date: string
    buildCV: string
    preview: string
    download: string
  }

  // Applications
  applications: {
    myApplications: string
    noApplications: string
    status: string
    applied: string
    inProgress: string
    reviewed: string
    submitted: string
    pending: string
    accepted: string
    rejected: string
    shortlisted: string
    continueAssessment: string
  }

  // Forms
  forms: {
    required: string
    optional: string
    example: string
    select: string
    add: string
    remove: string
  }

  // Messages
  messages: {
    saved: string
    deleted: string
    created: string
    updated: string
    actionFailed: string
  }
}

export const translations: Record<Language, Translations> = {
  ar: {
    common: {
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      register: "إنشاء حساب",
      dashboard: "لوحة التحكم",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      create: "إنشاء",
      submit: "إرسال",
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجح",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      search: "بحث",
      filter: "تصفية",
      reset: "إعادة تعيين",
      close: "إغلاق",
      yes: "نعم",
      no: "لا",
    },
    nav: {
      dashboard: "لوحة التحكم",
      users: "المستخدمين",
      companies: "الشركات",
      jobs: "الوظائف",
      browseJobs: "تصفح الوظائف",
      applications: "طلباتي",
      cv: "السيرة الذاتية",
      submissions: "المتقدمين",
      adminDashboard: "لوحة تحكم المدير",
      resume: "السيرة الذاتية",
    },
    home: {
      title: "منصة التوظيف",
      platformTitle: "منجم",
      subtitle: "منصة التوظيف الذكية",
      description: "نربط بين الشركات والمواهب من خلال نظام تقييم شامل ومتطور",
      forCompanies: "للشركات",
      forJobSeekers: "للباحثين عن عمل",
      features: "مميزات المنصة",
      jobManagement: "إدارة الوظائف",
      jobManagementDesc: "نشر وإدارة الوظائف بسهولة مع نظام تقييم متكامل",
      multipleAssessments: "تقييمات متعددة",
      multipleAssessmentsDesc: "اختبارات برمجية، إكسل، فيديو، أسئلة متعددة الخيارات وأكثر",
      autoGrading: "تصحيح تلقائي",
      autoGradingDesc: "تصحيح تلقائي للأسئلة البرمجية والاختيارات المتعددة",
      cvBuilder: "بناء السيرة الذاتية",
      cvBuilderDesc: "أنشئ سيرتك الذاتية واحصل على ملف PDF احترافي",
      startJourney: "ابدأ رحلتك الآن",
      joinPlatform: "انضم إلى آلاف الشركات والباحثين عن عمل على منصتنا",
      createFreeAccount: "إنشاء حساب مجاني",
      allRightsReserved: "© 2025 منجم. جميع الحقوق محفوظة.",
    },
    auth: {
      login: "تسجيل الدخول",
      loginTitle: "تسجيل الدخول",
      loginDescription: "أدخل بياناتك للوصول إلى حسابك",
      register: "إنشاء حساب",
      registerTitle: "إنشاء حساب جديد",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      fullName: "الاسم الكامل",
      companyName: "اسم الشركة",
      dontHaveAccount: "ليس لديك حساب؟",
      createNewAccount: "إنشاء حساب جديد",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      loginHere: "تسجيل الدخول هنا",
      demoAccounts: "حسابات تجريبية:",
      admin: "مدير",
      company: "شركة",
      candidate: "متقدم",
      anyPassword: "(كلمة المرور: أي شيء)",
      emailOrPasswordIncorrect: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      emailAlreadyUsed: "البريد الإلكتروني مستخدم بالفعل",
      loginFailed: "فشل تسجيل الدخول",
      registrationFailed: "فشل إنشاء الحساب",
      loggingIn: "جاري تسجيل الدخول...",
      enterYourCredentials: "أدخل بياناتك للوصول إلى حسابك",
      selectRole: "اختر نوع الحساب",
      jobSeeker: "باحث عن عمل",
      enterYourInfo: "اختر نوع الحساب وأدخل بياناتك",
      createAccountLoading: "جاري إنشاء الحساب...",
      enterFullName: "أدخل اسمك الكامل",
      enterCompanyName: "أدخل اسم الشركة",
    },
    dashboard: {
      welcome: "مرحباً",
      overview: "نظرة عامة",
      statistics: "الإحصائيات",
      recentActivity: "النشاط الأخير",
      totalJobs: "إجمالي الوظائف",
      activeJobs: "الوظائف النشطة",
      totalApplications: "إجمالي الطلبات",
      pendingApplications: "الطلبات المعلقة",
      totalCandidates: "إجمالي المرشحين",
      totalSubmissions: "إجمالي المتقدمين",
      controlPanel: "لوحة التحكم",
      welcomeMessage: "مرحباً بك،",
      browseJobs: "تصفح الوظائف",
      addNewJob: "إضافة وظيفة جديدة",
      inProgress: "قيد التنفيذ",
      completed: "مكتملة",
      myRecentApplications: "طلباتي الأخيرة",
      recentJobs: "الوظائف الأخيرة",
      viewAll: "عرض الكل",
      noApplicationsYet: "لم تتقدم لأي وظائف بعد",
      browseAvailableJobs: "تصفح الوظائف المتاحة",
      totalApplicants: "إجمالي المتقدمين",
      noJobsYet: "لم تقم بإضافة أي وظائف بعد",
      startAddingJobs: "ابدأ بإضافة وظيفة جديدة لاستقبال المتقدمين",
      applicant: "متقدم",
      applicants: "متقدم",
    },
    jobs: {
      title: "العنوان",
      description: "الوصف",
      requirements: "المتطلبات",
      location: "الموقع",
      type: "النوع",
      salary: "الراتب",
      status: "الحالة",
      active: "نشط",
      closed: "مغلق",
      draft: "مسودة",
      createJob: "إنشاء وظيفة",
      editJob: "تعديل الوظيفة",
      deleteJob: "حذف الوظيفة",
      noJobs: "لا توجد وظائف",
      apply: "تقدم للوظيفة",
      viewDetails: "عرض التفاصيل",
      jobManagement: "إدارة الوظائف",
      createAndManageJobs: "قم بإنشاء وإدارة الوظائف المتاحة",
      noJobsAvailable: "لا توجد وظائف متاحة حالياً",
      checkBackLater: "تحقق مرة أخرى لاحقاً للحصول على فرص جديدة",
      requiresAssessment: "يتطلب تقييم",
      discoverOpportunities: "اكتشف الفرص المتاحة وتقدم للوظائف",
      jobDetails: "تفاصيل الوظيفة",
      industry: "الصناعة",
      size: "حجم الشركة",
    },
    assessments: {
      title: "عنوان التقييم",
      description: "وصف التقييم",
      timeLimit: "الوقت المحدد",
      minutes: "دقيقة",
      passingScore: "الدرجة المطلوبة",
      createAssessment: "إنشاء تقييم",
      editAssessment: "تعديل التقييم",
      sections: "الأقسام",
      questions: "الأسئلة",
      startAssessment: "بدء التقييم",
      submitAssessment: "إرسال التقييم",
      assessmentInfo: "معلومات التقييم",
      assessmentTitle: "عنوان التقييم *",
      assessmentDescription: "وصف التقييم",
      timeLimitMinutes: "الوقت المحدد (بالدقائق) *",
      passingScoreRequired: "الدرجة المطلوبة للنجاح *",
      videoQuestion: "سجل إجابتك بالفيديو",
      videoQuestionDesc: "سيتم تسجيل فيديو لإجابتك. يمكنك إعادة التسجيل قبل الإرسال.",
      startRecording: "بدء التسجيل",
      stopRecording: "إيقاف التسجيل",
      recorded: "تم التسجيل",
      reRecord: "إعادة التسجيل",
      videoSaved: "تم حفظ الفيديو. يمكنك إعادة التسجيل أو المتابعة.",
      testCases: "حالات الاختبار",
      testCasesOptional: "حالات الاختبار (اختياري)",
      testCasesDescription: "حالات الاختبار تُستخدم للتحقق التلقائي من صحة الكود. يمكنك إضافتها للتحقق التلقائي، أو مراجعة الكود يدوياً بعد الإرسال.",
      testCasesExample: "مثال: إذا كان السؤال 'اكتب دالة لحساب المجموع'، المدخل: [1, 2, 3] والمخرج المتوقع: 6",
      input: "المدخل",
      expectedOutput: "المخرج المتوقع",
      addTestCase: "إضافة حالة اختبار",
      manualReview: "إذا لم تضيف حالات اختبار، سيتم مراجعة الإجابة يدوياً.",
      allQuestionsRequired: "يجب الإجابة على جميع الأسئلة قبل الإرسال",
      cannotEditAfterSubmit: "لن تتمكن من التعديل بعد الإرسال",
    },
    cv: {
      personalInfo: "المعلومات الشخصية",
      education: "التعليم",
      experience: "الخبرات",
      skills: "المهارات",
      languages: "اللغات",
      certifications: "الشهادات",
      summary: "ملخص",
      phone: "الهاتف",
      address: "العنوان",
      degree: "الدرجة العلمية",
      institution: "المؤسسة",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
      jobTitle: "المسمى الوظيفي",
      company: "الشركة",
      level: "المستوى",
      name: "الاسم",
      issuer: "المصدر",
      date: "التاريخ",
      buildCV: "بناء السيرة الذاتية",
      preview: "معاينة",
      download: "تحميل",
    },
    applications: {
      myApplications: "طلباتي",
      noApplications: "لا توجد طلبات",
      status: "الحالة",
      applied: "تم التقديم",
      inProgress: "قيد التنفيذ",
      reviewed: "تمت المراجعة",
      submitted: "مكتمل",
      pending: "معلق",
      accepted: "مقبول",
      rejected: "مرفوض",
      shortlisted: "قائمة مختصرة",
      continueAssessment: "متابعة التقييم",
    },
    forms: {
      required: "مطلوب",
      optional: "اختياري",
      example: "مثال",
      select: "اختر",
      add: "إضافة",
      remove: "إزالة",
    },
    messages: {
      saved: "تم الحفظ",
      deleted: "تم الحذف",
      created: "تم الإنشاء",
      updated: "تم التحديث",
      actionFailed: "فشلت العملية",
    },
  },
  en: {
    common: {
      login: "Login",
      logout: "Logout",
      register: "Register",
      dashboard: "Dashboard",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      submit: "Submit",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      back: "Back",
      next: "Next",
      previous: "Previous",
      search: "Search",
      filter: "Filter",
      reset: "Reset",
      close: "Close",
      yes: "Yes",
      no: "No",
    },
    nav: {
      dashboard: "Dashboard",
      users: "Users",
      companies: "Companies",
      jobs: "Jobs",
      browseJobs: "Browse Jobs",
      applications: "My Applications",
      cv: "Resume",
      submissions: "Submissions",
      adminDashboard: "Admin Dashboard",
      resume: "Resume",
    },
    home: {
      title: "Job Platform",
      platformTitle: "Manjam",
      subtitle: "Smart Job Platform",
      description: "Connecting companies and talents through a comprehensive and advanced evaluation system",
      forCompanies: "For Companies",
      forJobSeekers: "For Job Seekers",
      features: "Platform Features",
      jobManagement: "Job Management",
      jobManagementDesc: "Easily post and manage jobs with an integrated assessment system",
      multipleAssessments: "Multiple Assessments",
      multipleAssessmentsDesc: "Coding tests, Excel, video, multiple choice questions and more",
      autoGrading: "Auto Grading",
      autoGradingDesc: "Automatic grading for coding questions and multiple choice questions",
      cvBuilder: "CV Builder",
      cvBuilderDesc: "Create your resume and get a professional PDF file",
      startJourney: "Start Your Journey Now",
      joinPlatform: "Join thousands of companies and job seekers on our platform",
      createFreeAccount: "Create Free Account",
      allRightsReserved: "© 2025 Manjam. All rights reserved.",
    },
    auth: {
      login: "Login",
      loginTitle: "Login",
      loginDescription: "Enter your credentials to access your account",
      register: "Register",
      registerTitle: "Create New Account",
      email: "Email",
      password: "Password",
      fullName: "Full Name",
      companyName: "Company Name",
      dontHaveAccount: "Don't have an account?",
      createNewAccount: "Create New Account",
      alreadyHaveAccount: "Already have an account?",
      loginHere: "Login here",
      demoAccounts: "Demo Accounts:",
      admin: "Admin",
      company: "Company",
      candidate: "Candidate",
      anyPassword: "(Password: anything)",
      emailOrPasswordIncorrect: "Email or password is incorrect",
      emailAlreadyUsed: "Email is already in use",
      loginFailed: "Login failed",
      registrationFailed: "Registration failed",
      loggingIn: "Logging in...",
      enterYourCredentials: "Enter your credentials to access your account",
      selectRole: "Select Account Type",
      jobSeeker: "Job Seeker",
      enterYourInfo: "Choose account type and enter your information",
      createAccountLoading: "Creating account...",
      enterFullName: "Enter your full name",
      enterCompanyName: "Enter company name",
    },
    dashboard: {
      welcome: "Welcome",
      overview: "Overview",
      statistics: "Statistics",
      recentActivity: "Recent Activity",
      totalJobs: "Total Jobs",
      activeJobs: "Active Jobs",
      totalApplications: "Total Applications",
      pendingApplications: "Pending Applications",
      totalCandidates: "Total Candidates",
      totalSubmissions: "Total Submissions",
      controlPanel: "Control Panel",
      welcomeMessage: "Welcome,",
      browseJobs: "Browse Jobs",
      addNewJob: "Add New Job",
      inProgress: "In Progress",
      completed: "Completed",
      myRecentApplications: "My Recent Applications",
      recentJobs: "Recent Jobs",
      viewAll: "View All",
      noApplicationsYet: "You haven't applied for any jobs yet",
      browseAvailableJobs: "Browse Available Jobs",
      totalApplicants: "Total Applicants",
      noJobsYet: "You haven't added any jobs yet",
      startAddingJobs: "Start by adding a new job to receive applicants",
      applicant: "applicant",
      applicants: "applicants",
    },
    jobs: {
      title: "Title",
      description: "Description",
      requirements: "Requirements",
      location: "Location",
      type: "Type",
      salary: "Salary",
      status: "Status",
      active: "Active",
      closed: "Closed",
      draft: "Draft",
      createJob: "Create Job",
      editJob: "Edit Job",
      deleteJob: "Delete Job",
      noJobs: "No jobs found",
      apply: "Apply for Job",
      viewDetails: "View Details",
      jobManagement: "Job Management",
      createAndManageJobs: "Create and manage available jobs",
      noJobsAvailable: "No jobs available at the moment",
      checkBackLater: "Check back later for new opportunities",
      requiresAssessment: "Requires Assessment",
      discoverOpportunities: "Discover available opportunities and apply for jobs",
      jobDetails: "Job Details",
      industry: "Industry",
      size: "Company Size",
    },
    assessments: {
      title: "Assessment Title",
      description: "Assessment Description",
      timeLimit: "Time Limit",
      minutes: "minutes",
      passingScore: "Passing Score",
      createAssessment: "Create Assessment",
      editAssessment: "Edit Assessment",
      sections: "Sections",
      questions: "Questions",
      startAssessment: "Start Assessment",
      submitAssessment: "Submit Assessment",
      assessmentInfo: "Assessment Information",
      assessmentTitle: "Assessment Title *",
      assessmentDescription: "Assessment Description",
      timeLimitMinutes: "Time Limit (minutes) *",
      passingScoreRequired: "Passing Score Required *",
      videoQuestion: "Record Your Video Answer",
      videoQuestionDesc: "Record a video of your answer. You can re-record before submitting.",
      startRecording: "Start Recording",
      stopRecording: "Stop Recording",
      recorded: "Recorded",
      reRecord: "Re-record",
      videoSaved: "Video saved. You can re-record or continue.",
      testCases: "Test Cases",
      testCasesOptional: "Test Cases (Optional)",
      testCasesDescription: "Test cases are used for automatic code verification. You can add them for auto-checking, or review the code manually after submission.",
      testCasesExample: "Example: If the question is 'Write a function to calculate the sum', Input: [1, 2, 3] and Expected Output: 6",
      input: "Input",
      expectedOutput: "Expected Output",
      addTestCase: "Add Test Case",
      manualReview: "If you don't add test cases, the answer will be reviewed manually.",
      allQuestionsRequired: "You must answer all questions before submitting",
      cannotEditAfterSubmit: "You cannot edit after submitting",
    },
    cv: {
      personalInfo: "Personal Information",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      languages: "Languages",
      certifications: "Certifications",
      summary: "Summary",
      phone: "Phone",
      address: "Address",
      degree: "Degree",
      institution: "Institution",
      startDate: "Start Date",
      endDate: "End Date",
      jobTitle: "Job Title",
      company: "Company",
      level: "Level",
      name: "Name",
      issuer: "Issuer",
      date: "Date",
      buildCV: "Build Resume",
      preview: "Preview",
      download: "Download",
    },
    applications: {
      myApplications: "My Applications",
      noApplications: "No applications found",
      status: "Status",
      applied: "Applied",
      inProgress: "In Progress",
      reviewed: "Reviewed",
      submitted: "Completed",
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
      shortlisted: "Shortlisted",
      continueAssessment: "Continue Assessment",
    },
    forms: {
      required: "Required",
      optional: "Optional",
      example: "Example",
      select: "Select",
      add: "Add",
      remove: "Remove",
    },
    messages: {
      saved: "Saved",
      deleted: "Deleted",
      created: "Created",
      updated: "Updated",
      actionFailed: "Action failed",
    },
  },
}

