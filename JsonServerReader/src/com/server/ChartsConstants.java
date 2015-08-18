package com.server;

public class ChartsConstants {
	
	//DropDown values
	public static String SSP_REPORTS = "sspReports";
	public static String RETARGETING_REPORTS = "retargetingReports";
	public static String CONV_GOALS_REPORTS = "convGoalReports";
	
	//URLs
	public static String SSP_REPORTS_URL = "http://ch22.gravity4.com:8080/sspLevels?sspId=SSP_ID&startDate=STDATE&endDate=EDDATE";
	public static String RETARGETING_REPORTS_URL = "http://ch22.gravity4.com:8080/retargeting/segment?startDate=STDATE&endDate=EDDATE";
	public static String CONVERSION_GOALS_REPORTS_URL = "http://ch22.gravity4.com:8080/conversions?goalId=GOALLID&startDate=STDATE&endDate=EDDATE";
	
	//URL constants
	public static String CMPGID = "CMPGID";
	public static String STDATE = "STDATE";
	public static String EDDATE = "EDDATE";
	public static String GOALLID = "GOALLID";
	public static String SSPID = "SSP_ID";
	//General Constants
	public static String SUCCESS = "success";
	public static String TRUE = "true";
	public static String SEG_ID = "segment_id";
	public static String GOAL_ID = "goal_id";
	
}
