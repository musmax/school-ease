const { User } = require('./user.model');
const { Role } = require('./role.model');
const { Permission } = require('./permission.model');
const { MessageTemplate } = require('./message_template.model');
const { Variable } = require('./variable.model');
const { Token } = require('./token.model');
const { Media } = require('./media.model');
const { School } = require('./school.model');
const { SchoolStudents } = require('./school_students.model');
const { SchoolClass } = require('./class.model');
const { ClassUser } = require('./class_user.model');
const { SchoolEmployee } = require('./school_employee.model');
const { ClassAttendance } = require('./attendance.model');
const { SchoolSession } = require('./school_session.model');
const { SchoolSessionTerm } = require('./school_session_term.model');
const { SchoolTermActivity } = require('./school_term_activities.model');
const { SchoolTermBreak } = require('./school_term_break.model');

exports.association = () => {
  // User - Token
  User.hasOne(Token, { foreignKey: 'userId', as: 'userToken' });
  Token.belongsTo(User, { foreignKey: 'userId', as: 'userToken' });

  // Role - Permission
  Role.belongsToMany(Permission, { through: 'role_permission' });
  Permission.belongsToMany(Role, { through: 'role_permission' });

  // // User - Role
  User.belongsToMany(Role, { through: 'user_role' });
  Role.belongsToMany(User, { through: 'user_role' });

  // User - Role | part 2
  Role.hasMany(User, { foreignKey: 'roleId', as: 'userRole' });
  User.belongsTo(Role, { foreignKey: 'roleId', as: 'userRole' });

  // Message Template - Variable
  MessageTemplate.belongsToMany(Variable, { through: 'message_variable' });
  Variable.belongsToMany(MessageTemplate, { through: 'message_variable' });

  // User - Message Template
  User.belongsToMany(MessageTemplate, { through: 'user_message_template' });
  MessageTemplate.belongsToMany(User, { through: 'user_message_template' });

  // User as principal - School
  User.hasMany(School, { foreignKey: 'createdBy', as: 'school_owner' });
  School.belongsTo(User, { foreignKey: 'createdBy', as: 'school_owner' });

  // User - Media
  User.hasMany(Media, { foreignKey: 'userId', as: 'media' });
  Media.belongsTo(User, { foreignKey: 'userId', as: 'media' });

  School.hasMany(SchoolClass, { foreignKey: 'schoolId', as: 'school_classes' });
  SchoolClass.belongsTo(School, { foreignKey: 'schoolId', as: 'school_classes' });

  SchoolClass.hasMany(ClassUser, { foreignKey: 'classId', as: 'class_users' });
  ClassUser.belongsTo(SchoolClass, { foreignKey: 'classId', as: 'class_users' });

  User.hasMany(ClassUser, { foreignKey: 'studentId', as: 'class_students' });
  ClassUser.belongsTo(User, { foreignKey: 'studentId', as: 'class_students' });

  User.hasMany(ClassUser, { foreignKey: 'teacherId', as: 'class_teachers' });
  ClassUser.belongsTo(User, { foreignKey: 'teacherId', as: 'class_teachers' });

  User.hasOne(ClassUser, { foreignKey: 'classCaptainId', as: 'class_captain' });
  ClassUser.belongsTo(User, { foreignKey: 'classCaptainId', as: 'class_captain' });

  User.belongsToMany(School, { through: SchoolStudents, foreignKey: 'school_id', as: 'schoool_students' });
  School.belongsToMany(User, { through: SchoolStudents, foreignKey: 'studentId', as: 'schoool_students' });

  // School - SchoolEmployee
  User.belongsToMany(School, { through: SchoolEmployee, foreignKey: 'employeeId', as: 'school_employees' });
  School.belongsToMany(User, { through: SchoolEmployee, foreignKey: 'school_id', as: 'school_employees' });

  User.hasMany(ClassAttendance, { foreignKey: 'studentId', as: 'student_attendance' });
  ClassAttendance.belongsTo(User, { foreignKey: 'studentId', as: 'student_attendance' });

  User.hasMany(ClassAttendance, { foreignKey: 'teacherId', as: 'class_teacher_attendance' });
  ClassAttendance.belongsTo(User, { foreignKey: 'teacherId', as: 'class_teacher_attendance' });

  SchoolClass.hasMany(ClassAttendance, { foreignKey: 'classId', as: 'attendance_class' });
  ClassAttendance.belongsTo(SchoolClass, { foreignKey: 'classId', as: 'attendance_class' });

  School.hasMany(ClassAttendance, { foreignKey: 'schoolId', as: 'school_class' });
  ClassAttendance.belongsTo(School, { foreignKey: 'schoolId', as: 'school_class' });

  SchoolSession.hasMany(ClassAttendance, { foreignKey: 'sessionId', as: 'session_attendance' });
  ClassAttendance.belongsTo(SchoolSession, { foreignKey: 'sessionId', as: 'session_attendance' });

  SchoolSessionTerm.hasMany(ClassAttendance, { foreignKey: 'termId', as: 'term_attendance' });
  ClassAttendance.belongsTo(SchoolSessionTerm, { foreignKey: 'termId', as: 'term_attendance' });

  User.hasMany(ClassAttendance, { foreignKey: 'standInMarker', as: 'stand_in_marker' });
  ClassAttendance.belongsTo(User, { foreignKey: 'standInMarker', as: 'stand_in_marker' });

  School.hasMany(SchoolSession, { foreignKey: 'schoolId', as: 'school_session' });
  SchoolSession.belongsTo(School, { foreignKey: 'schoolId', as: 'school_session' });

  SchoolSession.hasMany(SchoolSessionTerm, { foreignKey: 'sessionId', as: 'school_session_terms' });
  SchoolSessionTerm.belongsTo(SchoolSession, { foreignKey: 'sessionId', as: 'school_session_terms' });

  SchoolSessionTerm.hasMany(SchoolTermActivity, { foreignKey: 'termId', as: 'school_term_activities' });
  SchoolTermActivity.belongsTo(SchoolSessionTerm, { foreignKey: 'termId', as: 'school_term_activities' });

  SchoolSessionTerm.hasMany(SchoolTermBreak, { foreignKey: 'termId', as: 'school_term_breaks' });
  SchoolTermBreak.belongsTo(SchoolSessionTerm, { foreignKey: 'termId', as: 'school_term_breaks' });
};
