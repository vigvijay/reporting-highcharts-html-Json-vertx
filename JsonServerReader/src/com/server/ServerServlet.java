package com.server;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import com.server.ChartsConstants;

import com.google.gson.JsonObject;

public class ServerServlet extends HttpServlet {

	private static final long serialVersionUID = -8270262600739431722L;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String campaignID = request.getParameter("campaignID");
		String startDate = request.getParameter("startDateString");
		String endDate = request.getParameter("endDateString");
		String isDayLimitApplied = request.getParameter("isDayLimited");
		String reportName = request.getParameter("reportName");
		
		PrintWriter out = response.getWriter();
		response.setContentType("text/html");
		response.setHeader("Cache-control", "no-cache, no-store");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", "-1");

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
		response.setHeader("Access-Control-Max-Age", "86400");

		JsonObject myObj = new JsonObject();
		
		if(campaignID != null && campaignID != "" && isNumeric(campaignID))
		{
			if(isDayLimitApplied !=null && isDayLimitApplied.equalsIgnoreCase(ChartsConstants.TRUE))
			{
				String jsonString = pingURL(campaignID,startDate,endDate, reportName);
				myObj.addProperty("jsonString", jsonString);
				if(reportName.equals(ChartsConstants.RETARGETING_REPORTS))
				{
					myObj.addProperty(ChartsConstants.SEG_ID, campaignID);
				}
				else if(reportName.equals(ChartsConstants.CONV_GOALS_REPORTS))
				{
					myObj.addProperty(ChartsConstants.GOAL_ID, campaignID);
				}
				if(jsonString.length() > 3)
				{
					myObj.addProperty(ChartsConstants.SUCCESS, true);
				}
				else
				{
					myObj.addProperty(ChartsConstants.SUCCESS, false);
				}
				
			}
			else
			{
				myObj.addProperty(ChartsConstants.SUCCESS, false);
			}
			
		}
		else
		{
			myObj.addProperty(ChartsConstants.SUCCESS, false);
		}
		out.println(myObj.toString());
		out.close();

	}
	
	public static boolean isNumeric(String str)  
	{  
	  try  
	  {  
	    double d = Double.parseDouble(str);  
	  }  
	  catch(NumberFormatException nfe)  
	  {  
	    return false;  
	  }  
	  return true;  
	}

	private String pingURL(String campaignId, String startDate, String endDate, String reportType) {
		String toBeSeparated = "";
		try {
			String urlString = new String();
			if(reportType.equals(ChartsConstants.SSP_REPORTS))
			{
				urlString  = ChartsConstants.SSP_REPORTS_URL;
				urlString = urlString.replaceAll(ChartsConstants.SSPID, campaignId);
				urlString = urlString.replaceAll(ChartsConstants.STDATE, startDate);
				urlString = urlString.replaceAll(ChartsConstants.EDDATE, endDate);
			}
			else if(reportType.equals(ChartsConstants.RETARGETING_REPORTS))
			{
				urlString  =ChartsConstants.RETARGETING_REPORTS_URL;
				urlString = urlString.replaceAll(ChartsConstants.STDATE, startDate);
				urlString = urlString.replaceAll(ChartsConstants.EDDATE, endDate);
			}
			else if(reportType.equals(ChartsConstants.CONV_GOALS_REPORTS))
			{
				urlString  =ChartsConstants.CONVERSION_GOALS_REPORTS_URL;
				urlString = urlString.replaceAll(ChartsConstants.STDATE, startDate);
				urlString = urlString.replaceAll(ChartsConstants.EDDATE, endDate);
				urlString = urlString.replaceAll(ChartsConstants.GOALLID, campaignId);
			}
			
			URL url = new URL(
					urlString);
//			URL url = new URL(
//					"http://ch22.gravity4.com:8080/sspLevels?campaignId=1296&startDate=0&endDate=1433945252000");
			BufferedReader br = new BufferedReader(new InputStreamReader(
					url.openStream()));
			String strTemp = "";

			while (null != (strTemp = br.readLine())) {
				toBeSeparated += strTemp;
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return toBeSeparated;
	}
}
