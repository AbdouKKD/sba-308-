const CourseInfo = { id: 451, name: "Introduction to JavaScript" };
// The provided assignment group.
const AssignmentGroup = {
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
    console.log("Input Parameters:", { courseInfo, assignmentGroup, learnerSubmissions });

    // Validate assignment group belongs to the course
    if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error("Assignment group does not belong to the specified course.");
    }
    console.log("Assignment group validated.");

    let results = {};

    for (const submission of learnerSubmissions) {
        console.log("Processing submission:", submission);

        const { learner_id, assignment_id, submission: { submitted_at, score } } = submission;
        const assignment = assignmentGroup.assignments.find(a => a.id === assignment_id);

        if (!assignment) {
            console.error(`Assignment ID ${assignment_id} not found in the assignment group.`);
            continue;
        }
        console.log(`Found assignment for ID ${assignment_id}:`, assignment);

        const dueDate = new Date(assignment.due_at);
        const submittedDate = new Date(submitted_at);
        console.log(`Due date: ${dueDate}, Submitted date: ${submittedDate}`);

        if (submittedDate > dueDate) {
            score -= (assignment.points_possible * 0.1);
            console.log(`Submission late. Adjusted score: ${score}`);
        }

        if (assignment.points_possible <= 0) {
            console.error(`Assignment ID ${assignment_id} has invalid points_possible: ${assignment.points_possible}`);
            continue;
        }

        if (!results[learner_id]) {
            results[learner_id] = { id: learner_id, avg: 0, scores: {}, totalPoints: 0, totalScore: 0 };
            console.log(`Initialized data for learner ID ${learner_id}.`);
        }

        const percentage = (score / assignment.points_possible) * 100;
        results[learner_id].scores[assignment_id] = percentage;
        results[learner_id].totalScore += score;
        results[learner_id].totalPoints += assignment.points_possible;

        console.log(`Updated scores for learner ID ${learner_id}:`, results[learner_id]);
    }

    const finalResults = Object.values(results).map(learner => {
        learner.avg = learner.totalPoints > 0 ? (learner.totalScore / learner.totalPoints) * 100 : 0;
        return learner;
    });

    console.log("Final results calculated:", finalResults);
    return finalResults;
}

try {
    const learnerResults = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(JSON.stringify(learnerResults, null, 2));
} catch (error) {
    console.error("Error:", error.message);
}