/**
 * @author Crunchify.com
 * 
 */
package de.rehau.uni.industrie.api;

import java.io.IOException;
import java.io.InputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import de.rehau.uni.industrie.api.model.Group;
import de.rehau.uni.industrie.api.model.Request;
import de.rehau.uni.industrie.business.Administrator;
 
@Path("")
public class DataServiceImpl implements DataService {
	static Administrator admin = new Administrator();

	@POST
	@Path("/addRequest/{groupId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response addRequest(Request request, @PathParam("groupId") int groupId) {
		admin.addRequest(groupId, request);
		return Response.ok("Request Added").build();
	}
	@GET
	@Path("/overview")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getOverview() {
		String result = "";
		result += "> ----------- <\n";
		result += "Verschiedene Gruppen: " + admin.groupCollection.size() + " --- \n\n";
		int runner = 0;
		for (Group group : admin.groupCollection) {
			runner += group.getUsers().size();
		}
		result += "Verschiedene User: " + runner + " --- \n\n";
		for (Group group : admin.groupCollection) {
			runner += group.getRequests().size();
		}
		result += "Verschiedene Requests: " + runner + " --- \n\n";

		return Response.ok(result).build();
	}
	@GET
	@Path("/assignRequest/{groupId}/{userId}/{requestId}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response assignRequest(@PathParam("groupId") int groupId, @PathParam("userId") int userId, @PathParam("requestId") int requestId) {
		admin.assignRequest(groupId, userId, requestId);
		return Response.ok("request assigned").build();
	}
	@GET
	@Path("/registerNewUser/{groupId}/{userRole}/{userName}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response addUser(@PathParam("groupId") int groupId, @PathParam("userRole") String userRole, @PathParam("userName") String userName) {
		int id;
		if(userRole.equals("consumer")) {
			id = admin.createNewConsumer(groupId, userName);
		} else {
			id = admin.createNewProducer(groupId, userName);
		}
		return Response.ok(Integer.toString(id)).build();
	}
	@GET
	@Path("/registerGroup/{groupCode}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response addUserToGroup(@PathParam("groupCode") String groupCode) {
		return Response.ok(Integer.toString(admin.addToGroupIfPossible(groupCode))).build();
	}
	@GET
	@Path("/getUserRequests/{groupId}/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnUserRequests(@PathParam("userId") int userId,@PathParam("groupId") int groupId, InputStream incomingData) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String result = mapper.writeValueAsString(admin.getUserRequests(groupId, userId));
		return Response.ok(result, MediaType.APPLICATION_JSON).build();
		// return HTTP response 200 in case of success
	}
	@GET
	@Path("/getRequests/{groupId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnRequests(@PathParam("groupId") int groupId,InputStream incomingData) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		String result = mapper.writeValueAsString(admin.getRequests(groupId));
		return Response.ok(result, MediaType.APPLICATION_JSON).build();
		// return HTTP response 200 in case of success
	}
	@Override
	public Response solveRequest(int groupId, int requestId) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Response submitTicket(int groupId, int requestId) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Response removeUser(int groupId, int userId) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Response getGlobalStatus() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Response fetchUpdates() {
		// TODO Auto-generated method stub
		return null;
	}
 
}