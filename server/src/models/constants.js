/*
Author: Nikhil Gurnani
Summary: This file contains all contants that can be used within models.
*/

const ERROR_TEMPLATES = {
  DUPLICATE_FIELDS_NAMED: 'Value for {field} already exists.',
  EMPTY_FIELD: '{field} can\'t be empty',
};

const GENDER_MALE = 'm';
const GENDER_FEMALE = 'f';
const GENDER_OTHERS = 'o';

const ENUM_GENDERS = [
  GENDER_FEMALE, GENDER_MALE, GENDER_OTHERS
];

const UT_MEMBER = 'member';
const UT_ADMIN = 'admin';
const UT_SUPERADMIN = 'superadmin';
const UT_STAFF = 'staff';

const ENUM_USERTYPES = [
  UT_MEMBER, UT_ADMIN, UT_SUPERADMIN, UT_STAFF,
];



const ENUM_WEEK_DAY_SUN = 1;
const ENUM_WEEK_DAY_MON = 2;
const ENUM_WEEK_DAY_TUE = 3;
const ENUM_WEEK_DAY_WED = 4;
const ENUM_WEEK_DAY_THR = 5;
const ENUM_WEEK_DAY_FRI = 6;
const ENUM_WEEK_DAY_SAT = 7;

const ENUM_WEEK_DAY_NUM = [
  ENUM_WEEK_DAY_SUN, ENUM_WEEK_DAY_MON, ENUM_WEEK_DAY_TUE, ENUM_WEEK_DAY_WED, ENUM_WEEK_DAY_THR, ENUM_WEEK_DAY_FRI, ENUM_WEEK_DAY_SAT
];
const DEVICE_TYPE_WEB_STR = 'web';
const DEVICE_TYPE_ANDROID_STR = 'android';
const DEVICE_TYPE_IOS_STR = 'ios';

const DEVICE_TYPE_ENUM = [
  DEVICE_TYPE_WEB_STR, DEVICE_TYPE_ANDROID_STR, DEVICE_TYPE_IOS_STR
];

module.exports = {
  ERROR_TEMPLATES,
  ENUM_GENDERS,
  ENUM_USERTYPES,
  ENUM_WEEK_DAY_NUM,
  DEVICE_TYPE_ENUM,
};
