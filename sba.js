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


function getLearnerData(arr) {
    if (assignmentGroup.course_id !== courseInfo.id) {
        throw new Error('Invalid input: AssignmentGroup does not belong to CourseInfo.');
    }
    const results = {};
    const assignmentsMap = {};

    for (const assignment of assignmentGroup.assignments) {
        if (typeof assignment.id !== 'number' || typeof assignment.points_possible !== 'number') {
            throw new Error(`Invalid data: Assignment ID or points_possible is not an assignment ${assignment.id}.`);
        }
        assignmentsMap[assignment.id] = {
            points_possible: assignment.points_possible,
            due_at: new Date(assignment.due_at),
            name: assignment.name,
        };
    }

    const assignmentInfo = assignmentsMap[assignmentId];
    const submissionDate = new Date(submission.submission.submitted_at);

    if (submissionDate <= assignmentInfo.due_at) {
        // No late penalty
        addSubmissionData(results, learnerId, assignmentId, submission.submission.score, assignmentInfo.points_possible);
    } else {
        // Apply late penalty
        const adjustedScore = Math.max(0, submission.submission.score - (0.1 * assignmentInfo.points_possible));
        addSubmissionData(results, learnerId, assignmentId, adjustedScore, assignmentInfo.points_possible);
    }
}
