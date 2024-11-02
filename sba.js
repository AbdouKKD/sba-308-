const CourseInfo = { id: 451, name: "Introduction to JavaScript" };
// The provided assignment group.
const assignmentGroup = {
    id: 12345, name: "Fundamentals of JavaScript", course_id: 451, group_weight: 25, assignments: [
        { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
        { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
        { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
    ]
};

const LearnerSubmissions = [
    { learner_id: 125, assignment_id: 1, submission: { Submitted_at: "2023-01-25", score: 47 } },// 47/50
    { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },// 150/150
    { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },// ignore
    { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } }, // 39/50
    { learner_id: 132, assignment_id: 2, submission: { Submitted_at: "2023-03-07", score: 140 } } //late
];
//learner id 132 is missed ass 3
//need the average of each learners grades, add up their scores then divide
function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    // Check if course ID matches
    if (courseInfo.id !== assignmentGroup.course_id) {
        throw new Error("Info not valid");
    }
    console.log("Course and assignment IDs match.");

    const currentDate = new Date();
    const result = {};

    // Process each submission
    for (const submission of learnerSubmissions) {
        const learnerId = submission.learner_id;
        const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);

        // Skip if the assignment is not found or not yet due
        if (!assignment || new Date(assignment.due_at) > currentDate) {
            continue;
        }

        // Initialize learner's data if not already present
        if (!result[learnerId]) {
            result[learnerId] = { id: learnerId, totalScore: 0, totalPoints: 0, avg: 0 };
        }

        let score = submission.submission.score;
        const isLate = new Date(submission.submission.submitted_at) > new Date(assignment.due_at);
        
        // Apply late penalty if submission is late
        if (isLate) {
            console.log(`Late penalty applied for learner ${learnerId} on assignment ${assignment.id}`);
            score -= assignment.points_possible * 0.1; // Deduct penalty
        }

        // Calculate percentage score for the assignment
        result[learnerId][assignment.id] = score / assignment.points_possible;

        // Update total scores and points
        result[learnerId].totalScore += score;
        result[learnerId].totalPoints += assignment.points_possible;

        // Calculate average score for the learner
        result[learnerId].avg = result[learnerId].totalScore / result[learnerId].totalPoints;
    }

    // Determine average performance for each learner
    for (const learner in result) {
        const average = result[learner].avg;
        switch (true) {
            case average >= 0.9:
                console.log(`Learner ${learner} has an excellent average.`);
                break;
            case average >= 0.75:
                console.log(`Learner ${learner} has a good average.`);
                break;
            case average < 0.75:
                console.log(`Learner ${learner} needs improvement.`);
                break;
            default:
                console.log(`No average available for learner ${learner}.`);
        }
    }

    return result;
}

try {
    const finalResult = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
    console.log("Final result:", finalResult);
} catch (error) {
    console.error("An error occurred:", error.message);
}

