package ca.utoronto.utm.mcs;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Map;

import org.json.*;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.Record;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;
import org.neo4j.driver.v1.Transaction;
import org.neo4j.driver.v1.TransactionWork;
import org.neo4j.driver.v1.exceptions.ClientException;
import org.neo4j.driver.v1.exceptions.NoSuchRecordException;

import static org.neo4j.driver.v1.Values.parameters;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class Course implements HttpHandler{
	public Driver driver;
	public Course(Driver d) {
		driver = d;
	}

	@Override
	public void handle(HttpExchange r) throws IOException {
		try {
			if(r.getRequestMethod().equals("GET")) {
				handleSearch(r);
			} 
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
		
	private void handleSearch(HttpExchange r) throws IOException, JSONException{
		r.getResponseHeaders().set("Access-Control-Allow-Origin","*");
		
		try (Session session = driver.session()){
			Map<String, String> queryParams = Utils.URIparams(r.getRequestURI().getQuery());
			
			String courseCode = queryParams.get("course");
			courseCode = courseCode.toUpperCase();
			// Right here is the query that returns the information desired using the course code provided by the user on the webpage.
			// Any other info that might be needed can be added by adding c.[fieldname]
			String courseQuery = String.format("MATCH (c:Course) WHERE (c.Code = \"%s\") RETURN c.Name, c.Year, c.Semester", courseCode);
			
			String transaction = session.writeTransaction(new TransactionWork<String>() {
				@Override
				public String execute(Transaction tx) {
					JSONObject searchResponse = new JSONObject();
					StatementResult courseResult = tx.run(courseQuery);
					try {
						if (!courseResult.hasNext()) {
							searchResponse.put("SearchResponse", "Course not found");
						} else {
							// this is where i format the information provided back to html
							
							// info is the part of the statement result with the query results
							// looks like this: Record<{c.Name: "Operating Systems", c.Year: "3", c.Semester: "Fall"}>
							String info = courseResult.next().toString();
							// remove up to the first set of quotes (our first return in the query is the course name as specified above)
							info = info.substring(info.indexOf("\"",info.indexOf("\""))+1);
							String name = info.split("\"")[0];
							// remove up to the third set of quotes notice the extra +1 for our substring function (our second query return is year)
							info = info.substring(info.indexOf("\"",info.indexOf("\"")+1)+1);
							String year = info.split("\"")[0];
							// remove up to the fifth set of quotes (our third query return is semester)
							// you get the idea
							info = info.substring(info.indexOf("\"",info.indexOf("\"")+1)+1);
							String semester = info.split("\"")[0];
							searchResponse.put("SearchResponse", "Name: " + name + "     Year: " + year + "     Semester: " + semester);
						}
					} catch (JSONException e) {
						e.printStackTrace();
					}
					return searchResponse.toString();
					}
				});
			r.sendResponseHeaders(200, transaction.length());
			System.out.print("200");
			OutputStream os = r.getResponseBody();
			os.write(transaction.getBytes());
			os.close(); 		
		} catch (NoSuchRecordException e) {
			System.out.print("404");
			r.sendResponseHeaders(404, -1);
			e.printStackTrace();
		} catch (Exception e) {
			r.sendResponseHeaders(400, -1);
			System.out.print("400");
			e.printStackTrace();
		}
	}
}
