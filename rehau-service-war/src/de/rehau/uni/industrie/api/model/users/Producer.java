package de.rehau.uni.industrie.api.model.users;

import java.util.ArrayList;
import java.util.List;

import de.rehau.uni.industrie.api.model.Request;

public class Producer implements User {
	private String name;
	private int id;
	private List<Request> requests = new ArrayList<Request>(); 
	public List<Request> getRequests() {
		return requests;
	}
	public void addRequest(Request request) {
		requests.add(request);
	}
	public String getName() {
		return this.name;
	}
	public int getId() {
		return this.id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Producer(String name) {
		this.name = name;
	}
}
