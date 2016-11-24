package de.rehau.uni.industrie.api.model;

import java.util.ArrayList;
import java.util.List;

import de.rehau.uni.industrie.api.model.users.User;

public class Group {
	List<Request> openRequests = new ArrayList<Request>();
	List<User> userCollection = new ArrayList<User>();
	private int id;
	private String code;

	public Group(String code, int id) {
		this.code = code;
		this.id = id;
	}
	public List<Request> getRequests() {
		return openRequests;
	}
	public void addRequest(Request request) {
		this.openRequests.add(request);
	}
	public void assignRequest(int userId, int requestId) {
		for (Request request : openRequests) {
			if(request.getId() == requestId) {
				for (User user : userCollection) {
					if(user.getId() == userId) {
						user.addRequest(request);
						openRequests.remove(request);
					}
				}
			}
		}
	}
	public List<User> getUsers() {
		return userCollection;
	}
	public void addUser(User userToAdd) {
		if(userCollection.contains(userToAdd))
			return;
		userCollection.add(userToAdd);
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
}
