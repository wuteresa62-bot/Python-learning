window.PY_CHALLENGE_FEEDBACK = {
  "card": {
    "structure": "# 1. 创建三个变量\nname = \"\"          # 填写姓名\ndays = 0            # 填写学习天数\ngoal = \"\"          # 填写学习目标\n\n# 2. 使用 print() 组合并输出三个变量\nprint(...) ",
    "solution": "name = \"小林\"\ndays = 7\ngoal = \"独立完成一个 Python 小项目\"\n\nprint(name, \"已学习\", days, \"天，目标是：\", goal)"
  },
  "progress": {
    "structure": "# 1. 保存已完成数量和总数量\ncompleted = 0\ntotal = 0\n\n# 2. 用减法计算剩余数量\nremaining = ...\n\n# 3. 输出进度信息\nprint(...) ",
    "solution": "completed = 6\ntotal = 10\nremaining = total - completed\n\nprint(\"已完成\", completed, \"课，共\", total, \"课，还剩\", remaining, \"课\")"
  },
  "status": {
    "structure": "# 依次创建字符串、整数和布尔变量\nlearner = \"\"\nlessons = 0\nis_ready = False\n\n# 输出学习状态\nprint(...) ",
    "solution": "learner = \"小雨\"\nlessons = 5\nis_ready = True\n\nprint(learner, \"已完成\", lessons, \"课，是否准备继续：\", is_ready)"
  },
  "grade": {
    "structure": "score = 0\n\nif 条件1:\n    print(\"优秀\")\nelif 条件2:\n    print(\"通过\")\nelse:\n    print(\"需要继续练习\")",
    "solution": "score = 85\n\nif score >= 90:\n    print(\"优秀\")\nelif score >= 60:\n    print(\"通过\")\nelse:\n    print(\"需要继续练习\")"
  },
  "counter": {
    "structure": "# range() 需要覆盖第 1 天到第 7 天\nfor day in range(...):\n    print(...) ",
    "solution": "for day in range(1, 8):\n    print(\"第\", day, \"天：学习打卡完成\")"
  },
  "countdown": {
    "structure": "count = 5\n\nwhile 条件:\n    print(count)\n    # 每轮让 count 减少 1\n    count = ...",
    "solution": "count = 5\n\nwhile count > 0:\n    print(count)\n    count -= 1\n\nprint(\"开始专注学习！\")"
  },
  "scores": {
    "structure": "scores = [...]\n\ntotal = sum(...)\naverage = total / len(...)\nhighest = max(...)\n\nprint(...) ",
    "solution": "scores = [82, 91, 76, 88, 95]\n\ntotal = sum(scores)\naverage = total / len(scores)\nhighest = max(scores)\n\nprint(\"总分：\", total)\nprint(\"平均分：\", average)\nprint(\"最高分：\", highest)"
  },
  "profile": {
    "structure": "student = {\n    \"name\": ...,\n    \"grade\": ...,\n    \"favorite_course\": ...\n}\n\nprint(...) ",
    "solution": "student = {\n    \"name\": \"小林\",\n    \"grade\": 8,\n    \"favorite_course\": \"Python\"\n}\n\nprint(\"姓名：\", student[\"name\"])\nprint(\"年级：\", student[\"grade\"])\nprint(\"最喜欢的课程：\", student[\"favorite_course\"])"
  },
  "dedupe": {
    "structure": "tags = [...]\nunique_tags = set(...)\n\nprint(\"去重前：\", len(...))\nprint(\"去重后：\", len(...))",
    "solution": "tags = [\"Python\", \"AI\", \"编程\", \"Python\", \"AI\"]\nunique_tags = set(tags)\n\nprint(\"去重前：\", len(tags))\nprint(\"去重后：\", len(unique_tags))\nprint(\"去重结果：\", unique_tags)"
  },
  "level": {
    "structure": "def study_level(minutes):\n    if 条件1:\n        return \"专注\"\n    elif 条件2:\n        return \"稳定\"\n    else:\n        return \"起步\"\n\nprint(study_level(...))",
    "solution": "def study_level(minutes):\n    if minutes >= 60:\n        return \"专注\"\n    elif minutes >= 30:\n        return \"稳定\"\n    else:\n        return \"起步\"\n\nprint(study_level(45))"
  },
  "summary": {
    "structure": "def summarize(numbers):\n    # 先处理空列表\n    if ...:\n        return ...\n\n    total = sum(...)\n    average = ...\n    highest = max(...)\n    return ...\n\nprint(summarize(...))",
    "solution": "def summarize(numbers):\n    if not numbers:\n        return {\"total\": 0, \"average\": 0, \"highest\": None}\n\n    total = sum(numbers)\n    average = total / len(numbers)\n    highest = max(numbers)\n    return {\"total\": total, \"average\": average, \"highest\": highest}\n\nprint(summarize([80, 90, 100]))"
  },
  "formatter": {
    "structure": "def build_report(name, lessons, goal):\n    report = ...\n    return report\n\nresult = build_report(...)\nprint(result)",
    "solution": "def build_report(name, lessons, goal):\n    report = f\"{name} 已完成 {lessons} 课，学习目标是：{goal}\"\n    return report\n\nresult = build_report(\"小林\", 6, \"完成一个 Python 项目\")\nprint(result)"
  },
  "student": {
    "structure": "class Student:\n    def __init__(self, name):\n        self.name = ...\n        self.points = ...\n\n    def add_points(self, value):\n        self.points = ...\n\nstudent = Student(...)\nstudent.add_points(...)\nprint(...) ",
    "solution": "class Student:\n    def __init__(self, name):\n        self.name = name\n        self.points = 0\n\n    def add_points(self, value):\n        self.points += value\n\nstudent = Student(\"小林\")\nstudent.add_points(20)\nprint(student.name, student.points)"
  },
  "book": {
    "structure": "class Book:\n    def __init__(self, title):\n        self.title = ...\n        self.is_borrowed = ...\n\n    def borrow(self):\n        self.is_borrowed = ...\n\nbook = Book(...)\nbook.borrow()\nprint(...) ",
    "solution": "class Book:\n    def __init__(self, title):\n        self.title = title\n        self.is_borrowed = False\n\n    def borrow(self):\n        self.is_borrowed = True\n\nbook = Book(\"Python 入门\")\nbook.borrow()\nprint(book.title, book.is_borrowed)"
  },
  "inherit": {
    "structure": "class Course:\n    def __init__(self, title):\n        self.title = ...\n\nclass OnlineCourse(...):\n    def __init__(self, title, platform):\n        # 调用父类初始化\n        ...\n        self.platform = ...",
    "solution": "class Course:\n    def __init__(self, title):\n        self.title = title\n\nclass OnlineCourse(Course):\n    def __init__(self, title, platform):\n        super().__init__(title)\n        self.platform = platform\n\ncourse = OnlineCourse(\"Python 基础\", \"在线课堂\")\nprint(course.title, course.platform)"
  },
  "quiz": {
    "structure": "questions = [...]\nscore = 0\n\nfor item in questions:\n    answer = input(...)\n    if ...:\n        score += 1\n\nprint(...) ",
    "solution": "questions = [\n    {\"question\": \"Python 中定义函数使用什么关键字？\", \"answer\": \"def\"},\n    {\"question\": \"列表索引从几开始？\", \"answer\": \"0\"},\n    {\"question\": \"布尔值真如何书写？\", \"answer\": \"True\"}\n]\nscore = 0\n\nfor item in questions:\n    answer = input(item[\"question\"] + \" \")\n    if answer == item[\"answer\"]:\n        score += 1\n\nprint(\"最终得分：\", score, \"/\", len(questions))"
  },
  "guess": {
    "structure": "import random\n\ntarget = random.randint(...)\n\nwhile True:\n    guess = int(input(...))\n    if guess < target:\n        ...\n    elif guess > target:\n        ...\n    else:\n        ...\n        break",
    "solution": "import random\n\ntarget = random.randint(1, 20)\n\nwhile True:\n    guess = int(input(\"请输入 1 到 20 之间的整数：\"))\n    if guess < target:\n        print(\"猜小了\")\n    elif guess > target:\n        print(\"猜大了\")\n    else:\n        print(\"猜对了！\")\n        break"
  },
  "tracker": {
    "structure": "tasks = []\n\nwhile True:\n    choice = input(...)\n\n    if choice == \"1\":\n        task = input(...)\n        tasks.append(...)\n    elif choice == \"2\":\n        ...\n    elif choice == \"3\":\n        break\n    else:\n        ...",
    "solution": "tasks = []\n\nwhile True:\n    print(\"1. 添加任务  2. 查看任务  3. 退出\")\n    choice = input(\"请选择：\")\n\n    if choice == \"1\":\n        task = input(\"请输入任务：\")\n        tasks.append(task)\n        print(\"任务已添加\")\n    elif choice == \"2\":\n        if tasks:\n            for index, task in enumerate(tasks, start=1):\n                print(index, task)\n        else:\n            print(\"目前没有任务\")\n    elif choice == \"3\":\n        print(\"已退出\")\n        break\n    else:\n        print(\"输入无效，请重新选择\")"
  }
};

