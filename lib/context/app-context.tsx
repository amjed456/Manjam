"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types
export type UserRole = "company" | "jobseeker" | "admin"

export interface User {
  id: string
  email: string
  role: UserRole
  fullName: string
  companyName?: string
  createdAt: string
}

export interface Job {
  id: string
  companyId: string
  title: string
  description: string
  requirements: string
  location: string
  type: string
  salary: string
  status: "active" | "closed" | "draft"
  createdAt: string
}

export interface Assessment {
  id: string
  jobId: string
  title: string
  description: string
  timeLimitMinutes: number
  passingScore: number
  createdAt: string
}

export interface Section {
  id: string
  assessmentId: string
  title: string
  description: string
  sectionType: "coding" | "excel" | "video" | "mcq" | "short_answer" | "long_answer" | "file_upload"
  order: number
  orderIndex?: number
  timeLimitMinutes?: number
}

export interface Question {
  id: string
  sectionId: string
  questionText: string
  questionType: string
  options?: string[]
  correctAnswer?: string
  testCases?: { input: string; expectedOutput: string }[]
  points: number
  order: number
}

export interface Submission {
  id: string
  jobId: string
  userId: string
  assessmentId: string
  status: "in_progress" | "submitted" | "reviewed"
  startedAt: string
  submittedAt?: string
  totalScore?: number
  maxScore?: number
  decision?: "pending" | "accepted" | "rejected" | "shortlisted"
  companyNotes?: string
}

export interface Answer {
  id: string
  submissionId: string
  questionId: string
  answerText?: string
  codeSubmission?: string
  fileUrl?: string
  videoUrl?: string
  score?: number
  maxScore?: number
  isCorrect?: boolean
  isManuallScored?: boolean
}

export interface CV {
  id: string
  userId: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    address: string
    summary: string
  }
  education: Array<{
    degree: string
    institution: string
    startDate: string
    endDate: string
    description: string
  }>
  experience: Array<{
    title: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: string[]
  languages: Array<{ language: string; level: string }>
  certifications: Array<{ name: string; issuer: string; date: string }>
}

interface AppContextType {
  // Auth
  currentUser: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    companyName?: string,
  ) => Promise<boolean>
  logout: () => void

  // Users
  users: User[]

  // Jobs
  jobs: Job[]
  addJob: (job: Omit<Job, "id" | "createdAt">) => string
  updateJob: (id: string, job: Partial<Job>) => void
  deleteJob: (id: string) => void
  getJobsByCompany: (companyId: string) => Job[]

  // Assessments
  assessments: Assessment[]
  addAssessment: (assessment: Omit<Assessment, "id" | "createdAt">) => string
  updateAssessment: (id: string, assessment: Partial<Assessment>) => void
  getAssessmentByJobId: (jobId: string) => Assessment | undefined

  // Sections
  sections: Section[]
  addSection: (section: Omit<Section, "id">) => string
  updateSection: (id: string, section: Partial<Section>) => void
  deleteSection: (id: string) => void
  getSectionsByAssessment: (assessmentId: string) => Section[]

  // Questions
  questions: Question[]
  addQuestion: (question: Omit<Question, "id">) => string
  updateQuestion: (id: string, question: Partial<Question>) => void
  deleteQuestion: (id: string) => void
  getQuestionsBySection: (sectionId: string) => Question[]

  // Submissions
  submissions: Submission[]
  addSubmission: (submission: Omit<Submission, "id" | "startedAt">) => string
  updateSubmission: (id: string, submission: Partial<Submission>) => void
  getSubmissionsByJob: (jobId: string) => Submission[]
  getSubmissionsByUser: (userId: string) => Submission[]

  // Answers
  answers: Answer[]
  addAnswer: (answer: Omit<Answer, "id">) => string
  updateAnswer: (id: string, answer: Partial<Answer>) => void
  getAnswersBySubmission: (submissionId: string) => Answer[]

  // CVs
  cvs: CV[]
  addCV: (cv: Omit<CV, "id">) => string
  updateCV: (id: string, cv: Partial<CV>) => void
  getCVByUser: (userId: string) => CV | undefined
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [cvs, setCVs] = useState<CV[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    const savedUsers = localStorage.getItem("users")
    const savedJobs = localStorage.getItem("jobs")
    const savedAssessments = localStorage.getItem("assessments")
    const savedSections = localStorage.getItem("sections")
    const savedQuestions = localStorage.getItem("questions")
    const savedSubmissions = localStorage.getItem("submissions")
    const savedAnswers = localStorage.getItem("answers")
    const savedCVs = localStorage.getItem("cvs")

    if (savedUser) setCurrentUser(JSON.parse(savedUser))
    if (savedUsers) setUsers(JSON.parse(savedUsers))
    if (savedJobs) setJobs(JSON.parse(savedJobs))
    if (savedAssessments) setAssessments(JSON.parse(savedAssessments))
    if (savedSections) setSections(JSON.parse(savedSections))
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions))
    if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions))
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
    if (savedCVs) setCVs(JSON.parse(savedCVs))

    // Initialize with demo admin user if no users exist
    if (!savedUsers) {
      const demoUsers: User[] = [
        {
          id: "1",
          email: "admin@demo.com",
          role: "admin",
          fullName: "مدير النظام",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          email: "company@demo.com",
          role: "company",
          fullName: "شركة تجريبية",
          companyName: "شركة التقنية المتقدمة",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          email: "candidate@demo.com",
          role: "jobseeker",
          fullName: "أحمد محمد",
          createdAt: new Date().toISOString(),
        },
      ]
      setUsers(demoUsers)
      localStorage.setItem("users", JSON.stringify(demoUsers))
    }

    // Initialize with demo jobs for the demo company (Libya-based) if no jobs exist for company "2"
    const existingJobs = savedJobs ? JSON.parse(savedJobs) : []
    const hasCompanyJobs = Array.isArray(existingJobs) && existingJobs.some((job: Job) => job.companyId === "2")
    
    if (!hasCompanyJobs) {
      const demoJobs: Job[] = [
        {
          id: "j1",
          companyId: "2",
          title: "مهندس برمجيات (Front-end)",
          description: "نبحث عن مهندس Front-end متمكن للعمل على واجهات حديثة باستخدام React/Next.js.",
          requirements: "خبرة سنتين على الأقل، معرفة جيدة بـ TypeScript و TailwindCSS.",
          location: "طرابلس، ليبيا",
          type: "دوام كامل",
          salary: "4000 - 6000 LYD",
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "j2",
          companyId: "2",
          title: "مصمم واجهات UI/UX",
          description: "تصميم واجهات حديثة وتجربة مستخدم متميزة للمنتجات الرقمية.",
          requirements: "محفظة أعمال قوية، إتقان Figma، فهم مبادئ التصميم.",
          location: "بنغازي، ليبيا",
          type: "دوام كامل",
          salary: "3500 - 5500 LYD",
          status: "active",
          createdAt: new Date().toISOString(),
        },
        {
          id: "j3",
          companyId: "2",
          title: "مهندس نظم Backend",
          description: "تطوير واجهات برمجية عالية الاعتمادية باستخدام Node.js و PostgreSQL.",
          requirements: "خبرة بالتخزين المؤقت، المراسلة، إدارة قواعد البيانات.",
          location: "طرابلس، ليبيا (عمل هجين)",
          type: "دوام كامل",
          salary: "5000 - 8000 LYD",
          status: "active",
          createdAt: new Date().toISOString(),
        },
      ]
      
      // Merge with existing jobs if any, otherwise use demo jobs only
      const finalJobs = Array.isArray(existingJobs) && existingJobs.length > 0 
        ? [...existingJobs, ...demoJobs]
        : demoJobs
      setJobs(finalJobs)
      localStorage.setItem("jobs", JSON.stringify(finalJobs))

      // Initialize demo assessments, sections, and questions for each job
      const existingAssessments = savedAssessments ? JSON.parse(savedAssessments) : []
      const existingSections = savedSections ? JSON.parse(savedSections) : []
      const existingQuestions = savedQuestions ? JSON.parse(savedQuestions) : []
      
      // Check if demo assessments exist - must have all 3 assessments (a1, a2, a3)
      // Also check if we have demo jobs (j1, j2, j3) - if we do, we should have assessments
      const hasDemoJobs = Array.isArray(finalJobs) && 
        finalJobs.some((j: Job) => j.id === "j1") &&
        finalJobs.some((j: Job) => j.id === "j2") &&
        finalJobs.some((j: Job) => j.id === "j3")
      
      const hasDemoAssessments = Array.isArray(existingAssessments) && 
        existingAssessments.some((a: Assessment) => a.id === "a1") &&
        existingAssessments.some((a: Assessment) => a.id === "a2") &&
        existingAssessments.some((a: Assessment) => a.id === "a3")

      // If we have demo jobs but no demo assessments, create them
      if (hasDemoJobs && !hasDemoAssessments) {
        // Assessment for Job 1: Front-end Engineer
        const assessment1: Assessment = {
          id: "a1",
          jobId: "j1",
          title: "تقييم Front-end Developer",
          description: "تقييم شامل لمهارات تطوير الواجهات الأمامية",
          timeLimitMinutes: 60,
          passingScore: 70,
          createdAt: new Date().toISOString(),
        }

        // Sections for Assessment 1
        const section1_1: Section = {
          id: "s1_1",
          assessmentId: "a1",
          title: "أسئلة MCQ - المفاهيم الأساسية",
          description: "اختبار معرفتك بمفاهيم React و JavaScript",
          sectionType: "mcq",
          order: 0,
          orderIndex: 0,
        }

        const section1_2: Section = {
          id: "s1_2",
          assessmentId: "a1",
          title: "أسئلة برمجية",
          description: "اكتب كود لحل المسائل التالية",
          sectionType: "coding",
          order: 1,
          orderIndex: 1,
        }

        const section1_3: Section = {
          id: "s1_3",
          assessmentId: "a1",
          title: "أسئلة نصية",
          description: "أجب عن الأسئلة التالية بشكل مفصل",
          sectionType: "short_answer",
          order: 2,
          orderIndex: 2,
        }

        // Questions for Section 1_1 (MCQ)
        const question1_1_1: Question = {
          id: "q1_1_1",
          sectionId: "s1_1",
          questionText: "ما هي الطريقة الصحيحة لتمرير البيانات من مكون أب إلى مكون ابن في React?",
          questionType: "mcq",
          options: [
            { text: "props", isCorrect: true },
            { text: "state", isCorrect: false },
            { text: "context", isCorrect: false },
            { text: "hooks", isCorrect: false },
          ],
          correctAnswer: "props",
          points: 10,
          order: 0,
          orderIndex: 0,
        }

        const question1_1_2: Question = {
          id: "q1_1_2",
          sectionId: "s1_1",
          questionText: "ما هو الفرق بين useMemo و useCallback في React?",
          questionType: "mcq",
          options: [
            { text: "useMemo للقيم، useCallback للدوال", isCorrect: true },
            { text: "لا يوجد فرق", isCorrect: false },
            { text: "useMemo للدوال، useCallback للقيم", isCorrect: false },
            { text: "كلاهما للقيم فقط", isCorrect: false },
          ],
          correctAnswer: "useMemo للقيم، useCallback للدوال",
          points: 10,
          order: 1,
          orderIndex: 1,
        }

        // Questions for Section 1_2 (Coding)
        const question1_2_1: Question = {
          id: "q1_2_1",
          sectionId: "s1_2",
          questionText: "اكتب دالة JavaScript لحساب مجموع جميع الأرقام في مصفوفة.\n\nمثال:\nInput: [1, 2, 3, 4]\nOutput: 10",
          questionType: "coding",
          testCases: [
            { input: "[1, 2, 3, 4]", expectedOutput: "10" },
            { input: "[5, 10, 15]", expectedOutput: "30" },
            { input: "[]", expectedOutput: "0" },
          ],
          points: 20,
          order: 0,
          orderIndex: 0,
        }

        const question1_2_2: Question = {
          id: "q1_2_2",
          sectionId: "s1_2",
          questionText: "اكتب دالة React لحساب عدد النقرات على زر.\n\nيجب أن يكون المكون:\n- يبدأ العد من 0\n- يزيد بمقدار 1 عند كل نقرة\n- يعرض العدد الحالي",
          questionType: "coding",
          testCases: [],
          points: 25,
          order: 1,
          orderIndex: 1,
        }

        // Questions for Section 1_3 (Short Answer)
        const question1_3_1: Question = {
          id: "q1_3_1",
          sectionId: "s1_3",
          questionText: "اشرح الفرق بين Virtual DOM و Real DOM في React. وما هي المزايا؟",
          questionType: "short_answer",
          points: 15,
          order: 0,
          orderIndex: 0,
        }

        // Assessment for Job 2: UI/UX Designer
        const assessment2: Assessment = {
          id: "a2",
          jobId: "j2",
          title: "تقييم UI/UX Designer",
          description: "تقييم مهارات التصميم والتفكير في تجربة المستخدم",
          timeLimitMinutes: 45,
          passingScore: 65,
          createdAt: new Date().toISOString(),
        }

        const section2_1: Section = {
          id: "s2_1",
          assessmentId: "a2",
          title: "أسئلة MCQ - مبادئ التصميم",
          description: "اختبار معرفتك بمبادئ التصميم والـ UX",
          sectionType: "mcq",
          order: 0,
          orderIndex: 0,
        }

        const section2_2: Section = {
          id: "s2_2",
          assessmentId: "a2",
          title: "أسئلة نصية",
          description: "أجب عن الأسئلة التالية",
          sectionType: "long_answer",
          order: 1,
          orderIndex: 1,
        }

        const question2_1_1: Question = {
          id: "q2_1_1",
          sectionId: "s2_1",
          questionText: "ما هو الهدف الرئيسي من اختبار قابلية الاستخدام (Usability Testing)?",
          questionType: "mcq",
          options: [
            { text: "تحسين تجربة المستخدم", isCorrect: true },
            { text: "زيادة الألوان", isCorrect: false },
            { text: "تسريع الكود", isCorrect: false },
            { text: "تقليل التكاليف", isCorrect: false },
          ],
          correctAnswer: "تحسين تجربة المستخدم",
          points: 10,
          order: 0,
          orderIndex: 0,
        }

        const question2_1_2: Question = {
          id: "q2_1_2",
          sectionId: "s2_1",
          questionText: "ما هي مبادئ التصميم الأساسية الثلاثة (3 C's)?",
          questionType: "mcq",
          options: [
            { text: "Color, Contrast, Consistency", isCorrect: true },
            { text: "Code, Content, Context", isCorrect: false },
            { text: "Clear, Concise, Complete", isCorrect: false },
            { text: "Creative, Cool, Cute", isCorrect: false },
          ],
          correctAnswer: "Color, Contrast, Consistency",
          points: 10,
          order: 1,
          orderIndex: 1,
        }

        const question2_2_1: Question = {
          id: "q2_2_1",
          sectionId: "s2_2",
          questionText: "اشرح بالتفصيل كيف تخطط لتصميم واجهة مستخدم جديدة لتطبيق جوال. ما هي الخطوات التي تتبعها؟",
          questionType: "long_answer",
          points: 30,
          order: 0,
          orderIndex: 0,
        }

        // Assessment for Job 3: Backend Engineer
        const assessment3: Assessment = {
          id: "a3",
          jobId: "j3",
          title: "تقييم Backend Developer",
          description: "تقييم شامل لمهارات تطوير الخوادم وقواعد البيانات",
          timeLimitMinutes: 90,
          passingScore: 75,
          createdAt: new Date().toISOString(),
        }

        const section3_1: Section = {
          id: "s3_1",
          assessmentId: "a3",
          title: "أسئلة MCQ - قواعد البيانات والخوادم",
          description: "اختبار معرفتك بقواعد البيانات و APIs",
          sectionType: "mcq",
          order: 0,
          orderIndex: 0,
        }

        const section3_2: Section = {
          id: "s3_2",
          assessmentId: "a3",
          title: "أسئلة برمجية",
          description: "اكتب كود لحل المسائل التالية",
          sectionType: "coding",
          order: 1,
          orderIndex: 1,
        }

        const question3_1_1: Question = {
          id: "q3_1_1",
          sectionId: "s3_1",
          questionText: "ما هو الفرق بين SQL و NoSQL?",
          questionType: "mcq",
          options: [
            { text: "SQL للبيانات المنظمة، NoSQL للبيانات غير المنظمة", isCorrect: true },
            { text: "لا يوجد فرق", isCorrect: false },
            { text: "SQL أسرع من NoSQL دائماً", isCorrect: false },
            { text: "NoSQL فقط للقواعد الصغيرة", isCorrect: false },
          ],
          correctAnswer: "SQL للبيانات المنظمة، NoSQL للبيانات غير المنظمة",
          points: 10,
          order: 0,
          orderIndex: 0,
        }

        const question3_1_2: Question = {
          id: "q3_1_2",
          sectionId: "s3_1",
          questionText: "ما هي طريقة HTTP الصحيحة لإنشاء مورد جديد (REST API)?",
          questionType: "mcq",
          options: [
            { text: "POST", isCorrect: true },
            { text: "GET", isCorrect: false },
            { text: "PUT", isCorrect: false },
            { text: "DELETE", isCorrect: false },
          ],
          correctAnswer: "POST",
          points: 10,
          order: 1,
          orderIndex: 1,
        }

        const question3_2_1: Question = {
          id: "q3_2_1",
          sectionId: "s3_2",
          questionText: "اكتب دالة Node.js/JavaScript لإنشاء API endpoint يحسب مجموع رقمين.\n\nالمتطلبات:\n- استقبال رقمين من query parameters\n- إرجاع النتيجة كـ JSON\n- معالجة الأخطاء",
          questionType: "coding",
          testCases: [
            { input: "?a=5&b=3", expectedOutput: '{"result": 8}' },
            { input: "?a=10&b=20", expectedOutput: '{"result": 30}' },
          ],
          points: 30,
          order: 0,
          orderIndex: 0,
        }

        // Add all demo data
        const demoAssessments = [assessment1, assessment2, assessment3]
        const demoSections = [
          section1_1, section1_2, section1_3,
          section2_1, section2_2,
          section3_1, section3_2,
        ]
        const demoQuestions = [
          question1_1_1, question1_1_2,
          question1_2_1, question1_2_2,
          question1_3_1,
          question2_1_1, question2_1_2,
          question2_2_1,
          question3_1_1, question3_1_2,
          question3_2_1,
        ]

        const finalAssessments = Array.isArray(existingAssessments) && existingAssessments.length > 0
          ? [...existingAssessments, ...demoAssessments]
          : demoAssessments
        const finalSections = Array.isArray(existingSections) && existingSections.length > 0
          ? [...existingSections, ...demoSections]
          : demoSections
        const finalQuestions = Array.isArray(existingQuestions) && existingQuestions.length > 0
          ? [...existingQuestions, ...demoQuestions]
          : demoQuestions

        setAssessments(finalAssessments)
        setSections(finalSections)
        setQuestions(finalQuestions)
        localStorage.setItem("assessments", JSON.stringify(finalAssessments))
        localStorage.setItem("sections", JSON.stringify(finalSections))
        localStorage.setItem("questions", JSON.stringify(finalQuestions))
      }
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }, [currentUser])

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs))
  }, [jobs])

  useEffect(() => {
    localStorage.setItem("assessments", JSON.stringify(assessments))
  }, [assessments])

  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections))
  }, [sections])

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions))
  }, [questions])

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions))
  }, [submissions])

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers))
  }, [answers])

  useEffect(() => {
    localStorage.setItem("cvs", JSON.stringify(cvs))
  }, [cvs])

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Check in current users state first
    let user = users.find((u) => u.email === email)
    
    // If not found, check localStorage
    if (!user) {
      const savedUsers = localStorage.getItem("users")
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers)
        user = parsedUsers.find((u: User) => u.email === email)
      }
    }
    
    // If still not found, check demo accounts (for demo accounts, any password works)
    if (!user) {
      const demoUsers: User[] = [
        {
          id: "1",
          email: "admin@demo.com",
          role: "admin",
          fullName: "مدير النظام",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          email: "company@demo.com",
          role: "company",
          fullName: "شركة تجريبية",
          companyName: "شركة التقنية المتقدمة",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          email: "candidate@demo.com",
          role: "jobseeker",
          fullName: "أحمد محمد",
          createdAt: new Date().toISOString(),
        },
      ]
      user = demoUsers.find((u) => u.email === email)
      
      // If found in demo users, add them to the users state and localStorage if not already there
      if (user) {
        const userExists = users.some((u) => u.id === user.id)
        if (!userExists) {
          const updatedUsers = [...users, user]
          setUsers(updatedUsers)
          localStorage.setItem("users", JSON.stringify(updatedUsers))
        }
      }
    }
    
    if (user) {
      setCurrentUser(user)
      return true
    }
    return false
  }

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole,
    companyName?: string,
  ): Promise<boolean> => {
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) return false

    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      fullName,
      companyName,
      createdAt: new Date().toISOString(),
    }

    setUsers([...users, newUser])
    setCurrentUser(newUser)
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  // Job functions
  const addJob = (job: Omit<Job, "id" | "createdAt">): string => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setJobs([...jobs, newJob])
    return newJob.id
  }

  const updateJob = (id: string, job: Partial<Job>) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, ...job } : j)))
  }

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id))
  }

  const getJobsByCompany = (companyId: string) => {
    return jobs.filter((j) => j.companyId === companyId)
  }

  // Assessment functions
  const addAssessment = (assessment: Omit<Assessment, "id" | "createdAt">): string => {
    const newAssessment: Assessment = {
      ...assessment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setAssessments([...assessments, newAssessment])
    return newAssessment.id
  }

  const updateAssessment = (id: string, assessment: Partial<Assessment>) => {
    setAssessments(assessments.map((a) => (a.id === id ? { ...a, ...assessment } : a)))
  }

  const getAssessmentByJobId = (jobId: string) => {
    return assessments.find((a) => a.jobId === jobId)
  }

  // Section functions
  const addSection = (section: Omit<Section, "id">): string => {
    const newSection: Section = {
      ...section,
      id: Date.now().toString(),
    }
    setSections([...sections, newSection])
    return newSection.id
  }

  const updateSection = (id: string, section: Partial<Section>) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, ...section } : s)))
  }

  const deleteSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id))
  }

  const getSectionsByAssessment = (assessmentId: string) => {
    return sections.filter((s) => s.assessmentId === assessmentId).sort((a, b) => a.order - b.order)
  }

  // Question functions
  const addQuestion = (question: Omit<Question, "id">): string => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
    }
    setQuestions([...questions, newQuestion])
    return newQuestion.id
  }

  const updateQuestion = (id: string, question: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...question } : q)))
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const getQuestionsBySection = (sectionId: string) => {
    return questions.filter((q) => q.sectionId === sectionId).sort((a, b) => a.order - b.order)
  }

  // Submission functions
  const addSubmission = (submission: Omit<Submission, "id" | "startedAt">): string => {
    const newSubmission: Submission = {
      ...submission,
      id: Date.now().toString(),
      startedAt: new Date().toISOString(),
    }
    setSubmissions([...submissions, newSubmission])
    return newSubmission.id
  }

  const updateSubmission = (id: string, submission: Partial<Submission>) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, ...submission } : s)))
  }

  const getSubmissionsByJob = (jobId: string) => {
    return submissions.filter((s) => s.jobId === jobId)
  }

  const getSubmissionsByUser = (userId: string) => {
    return submissions.filter((s) => s.userId === userId)
  }

  // Answer functions
  const addAnswer = (answer: Omit<Answer, "id">): string => {
    const newAnswer: Answer = {
      ...answer,
      id: Date.now().toString(),
    }
    setAnswers([...answers, newAnswer])
    return newAnswer.id
  }

  const updateAnswer = (id: string, answer: Partial<Answer>) => {
    setAnswers(answers.map((a) => (a.id === id ? { ...a, ...answer } : a)))
  }

  const getAnswersBySubmission = (submissionId: string) => {
    return answers.filter((a) => a.submissionId === submissionId)
  }

  // CV functions
  const addCV = (cv: Omit<CV, "id">): string => {
    const newCV: CV = {
      ...cv,
      id: Date.now().toString(),
    }
    setCVs([...cvs, newCV])
    return newCV.id
  }

  const updateCV = (id: string, cv: Partial<CV>) => {
    setCVs(cvs.map((c) => (c.id === id ? { ...c, ...cv } : c)))
  }

  const getCVByUser = (userId: string) => {
    return cvs.find((c) => c.userId === userId)
  }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        users,
        jobs,
        addJob,
        updateJob,
        deleteJob,
        getJobsByCompany,
        assessments,
        addAssessment,
        updateAssessment,
        getAssessmentByJobId,
        sections,
        addSection,
        updateSection,
        deleteSection,
        getSectionsByAssessment,
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        getQuestionsBySection,
        submissions,
        addSubmission,
        updateSubmission,
        getSubmissionsByJob,
        getSubmissionsByUser,
        answers,
        addAnswer,
        updateAnswer,
        getAnswersBySubmission,
        cvs,
        addCV,
        updateCV,
        getCVByUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
