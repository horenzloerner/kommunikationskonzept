package de.rehau.uni.industrie.business;

import java.util.ArrayList;
import java.util.List;

import de.rehau.uni.industrie.api.model.Group;
import de.rehau.uni.industrie.api.model.Request;
import de.rehau.uni.industrie.api.model.users.Consumer;
import de.rehau.uni.industrie.api.model.users.Producer;
import de.rehau.uni.industrie.api.model.users.User;

public class Administrator {
	public List<Group> groupCollection = new ArrayList<Group>();

	public List<Request> getRequests(int groupId) {
		for (Group group : groupCollection) {
			if(group.getId() == groupId) {
				return group.getRequests();
			}
		}
		return null;
	}
	public int createNewConsumer(int groupId, String name) {
		for (Group group : groupCollection) {
			if(group.getId() == groupId) {
				User newUser = new Consumer(name);
				int id = group.getUsers().size();
				newUser.setId(id);
				group.addUser(newUser);
				return id;
			}
		}
		return -1;
	}
	public int createNewProducer(int groupId, String name) {
		for (Group group : groupCollection) {
			if(group.getId() == groupId) {
				User newUser = new Producer(name);
				int id = group.getUsers().size();
				newUser.setId(id);
				group.addUser(newUser);
				return id;
			}
		}
		return -1;
	}
	public void assignRequest(int groupId, int userId, int requestId) {
		for (Group group : groupCollection) {
			if(group.getId() == groupId) {
				group.assignRequest(userId, requestId);
			}
		}
	}
	public void addRequest(int groupId, Request request) {
		for (Group group : groupCollection) {
			if(group.getId() == groupId) {
				group.addRequest(request);
			}
		}	
	}
	public List<Request> getUserRequests(int groupId, int userId) {
		for (Group group : groupCollection) {
			if(group.getId() == groupId) {
				for (User user : group.getUsers()) {
					if(user.getId() == userId){
						return user.getRequests();
					}
				}
			}
		}
		return null;
	}
	public int addToGroupIfPossible(String groupCode) {
		for (Group group : groupCollection) {
			if(group.getCode().equals(groupCode)) {
				return group.getId();
			}
		}
		Group temporaryGroup = new Group(groupCode, groupCollection.size());
		groupCollection.add(temporaryGroup);
		return temporaryGroup.getId();
	}
}
