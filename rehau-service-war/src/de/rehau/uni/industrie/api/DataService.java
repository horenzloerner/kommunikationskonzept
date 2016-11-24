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
import de.rehau.uni.industrie.api.model.Request;
import de.rehau.uni.industrie.business.Administrator;
 
@Path("")
public interface DataService {
	static Administrator admin = new Administrator();
	@GET
	@Path("/globalStatus")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getGlobalStatus();
	@GET
	@Path("/fetchUpdates")
	@Produces(MediaType.TEXT_PLAIN)
	public Response fetchUpdates();
	@POST
	@Path("/addRequest/{groupId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response addRequest(Request request, @PathParam("groupId") int groupId);
	@GET
	@Path("/solveRequest/{groupId}/{requestId}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response solveRequest(@PathParam("groupId") int groupId,@PathParam("requestId") int requestId);
	@GET
	@Path("/submitTicket/{groupId}/{requestId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response submitTicket(@PathParam("groupId") int groupId,@PathParam("requestId") int requestId);
	@GET
	@Path("/overview")
	@Produces(MediaType.TEXT_PLAIN)
	public Response getOverview();
	@GET
	@Path("/assignRequest/{groupId}/{userId}/{requestId}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response assignRequest(@PathParam("groupId") int groupId, @PathParam("userId") int userId, @PathParam("requestId") int requestId);
	@GET
	@Path("/registerNewUser/{groupId}/{userRole}/{userName}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response addUser(@PathParam("groupId") int groupId, @PathParam("userRole") String userRole, @PathParam("userName") String userName);
	@GET
	@Path("/unregisterUser/{groupId}/{userId}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response removeUser(@PathParam("groupId") int groupId, @PathParam("userId") int userId);
	@GET
	@Path("/registerGroup/{groupCode}")
	@Produces(MediaType.TEXT_PLAIN)
	public Response addUserToGroup(@PathParam("groupCode") String groupCode);
	@GET
	@Path("/getUserRequests/{groupId}/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnUserRequests(@PathParam("userId") int userId,@PathParam("groupId") int groupId, InputStream incomingData) throws JsonGenerationException, JsonMappingException, IOException;
	@GET
	@Path("/getRequests/{groupId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnRequests(@PathParam("groupId") int groupId,InputStream incomingData) throws JsonGenerationException, JsonMappingException, IOException; 
}