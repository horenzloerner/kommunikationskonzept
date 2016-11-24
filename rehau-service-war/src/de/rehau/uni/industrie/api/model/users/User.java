package de.rehau.uni.industrie.api.model.users;

import java.util.List;

import de.rehau.uni.industrie.api.model.Request;

public interface User {
	String getName();
	void setName(String name);
	List<Request> getRequests();
	void addRequest(Request request);
	int getId();
	void setId(int id);
}
