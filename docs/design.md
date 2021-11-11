
# your design decisions, including their rationale (include images)

-   We first designed our web app in Figma for it's ease of use and because it allowed us to examine our iterative changes. Once we were confident in our final design, we then started creating our html pages using our Figma frames as reference.
    

![All the designs we used before getting to our final design on the right](https://i.imgur.com/CAfvcxF.png)
    

 -   Frame 26 shows our final design in Figma. We implemented a header to show visual hierarchy and consistency with the rest of the design, and it also serves to display the application name.
![the final design in Figma](https://i.imgur.com/BZNqMJ7.png)
    
 -   There are two collapsible drop down menus for “To Do” tasks and “Completed” tasks. While we wanted to be able to access our tasks in as little interactions as possible, it was also important to us to show only some tasks or only the completed tasks, or both. 
    
 -   Each task has a checkbox next to it, and clicking or tapping on this will mark it completed, and move it to the Completed task folder. While in the completed task folder, unchecking the boxes will move the task back to the To Do folder. Tasks can also be renamed by clicking on the text of any task and changing it. We knew we weren’t trying to radically change to do apps, so we mostly followed convention when thinking about our design, such as check boxes or drown down menus.
    
 -   To add tasks or clear completed tasks there’s a plus button which, when pressed, will show the options to add a new task or clear completed tasks. Clicking add a new task will give the option to type in the name for a new task. Clicking clear completed tasks will clear all tasks marked completed, but after doing so will give the option to undo the action, as we wanted to implement user forgiveness
 
 - **Lab 2 Update:** Our finished Lab2 resembles our initial designs in Figma closely, yet some libraries are used which alter the aesthetics of some objects, like checkboxes. However, the finished webapp still closely resembles our results from Lab1. 

# alternative designs you considered

-   There were around 32 different designs created during the design process. Highlighted here are some of the significant changes and alternative designs we made.
    
-   One of our first designs shown here had different colors altogether and blocked each task. While chunking each task would be nice for separation, we felt it added too much unnecessary noise and wouldn’t follow consistency with our other design elements such as the width of the drop down folder titles. We opted instead for not chunking our tasks individually and instead grouping them by whether they’re uncompleted or not.

![Our first fleshed out design!](https://i.imgur.com/qYOTFlR.png)
    
-   Another design option we had was to have a large button for adding tasks, as shown in frame 13. This would have made it easier for users to add tasks they wanted, but we felt this was difficult to implement as users would not be able to distinguish the button itself or tell that it is a button. We wanted it to be consistent with our other design elements, so this was scrapped in favor of the plus menu button. This also helped solve our problem with the clear all completed tasks button, as we weren’t sure where it would be appropriate to place one. We didn’t want users to press it accidentally, but we also wanted it to be easily accessible.

 ![Our design for adding new tasks](https://i.imgur.com/aamEN8z.png)

-   We also thought of having separate pages for uncompleted and completed tasks. This would mean instead of being able to view both at the same time, you could only view one at a time. However, we opted against this as this would have added substantially more button clicks/interactions with the application, and we felt this would have added noise to what was otherwise a simple interaction to view items. We opted for drop down menus to solve this problem as a drop down menu won’t have users going back and forth and back and forth between completed and uncompleted tasks.
  ![Different pages for folders](https://i.imgur.com/QYS40Tf.png)

-   We experimented with header sizes and figured out quickly that having smaller headers leads to empty space and inconsistency. We felt that if we were trying to have multiple directories or if we were adding user customization to our web app then this would be a good route to take, but feeling that this only makes sense if we added more features, we'd make the app worse to use and so we opted against this.

![smaller header sizes/no headers](https://i.imgur.com/jkyypuA.png)    

-   We also experimented with header colors, which both of us felt looked very good. Each header would have a different color, but the text would be a lighter or darker shade of the color. However, after some user testing we realized that this didn’t afford for users with impaired vision as the contrast was too low. We made changes to the header colors as well as our title to make it easier to read for everyone.

![Low contrast header](https://i.imgur.com/eWjrzeH.png)
    
-   The final design choice we struggled with was our plus button. We knew we wanted to use a menu to choose whether to add tasks or clear tasks as well as an undo button, but we weren’t sure how to implement an undo button. Putting an undo button inside the menu would mean the undo button could be pressed accidentally, and putting it in most places elsewhere meant covering up some portion of the screen should the user mean to have pressed the clear all tasks button. We settled on overlaying an undo button above the plus menu button, as it would also not cover any other options like the plus button or marking tasks completed.


![Final design vs previous design](https://i.imgur.com/Dszg72P.png)![All tasks cleared vs....](https://i.imgur.com/Eswi7M3.png)

- **Lab 2 Update:** During lab2 we discussed changing the completed tasks cleared option, but opted for the first choice above. While the second option seems more consistent with the action button, we liked the functionality of the first option much more.
In terms of design decisions in our React webapp, we opted to use React Redux to better manage our different states. 

# any user testing you did

-   We performed a round of user testing during the design process. The feedback we received was very helpful in helping us improve our application. Some of the improvements made using this feedback were…
    

-   Improving contrast of text for users with impaired vision
    
-   Changing colors as the existing colors “clashed” and were “very distracting”
    
-   Making the text bigger
    
-   Making further improvements to the plus menu.

- **Lab 2 Update:** While we performed user testing once again, the results were largely the same as our design hadn't changed much. Thus, we decided to follow lab1's outline. 


# the final design, including screen images and the flow for each task.
- The designs previously have been the figma prototypes we created. The final design for the website as well as the flow per each task can be seen below:

- The html index page:

![enter image description here](https://i.imgur.com/DvZik84.png)

- Add task to empty list flow

![enter image description here](https://i.imgur.com/1Ck3iLv.png)
![enter image description here](https://i.imgur.com/tT6aSxR.png)![enter image description here](https://i.imgur.com/UaUUaHJ.png)![enter image description here](https://i.imgur.com/FhomSxV.png)

- Add task to non empty list:

![enter image description here](https://i.imgur.com/s3RmfM5.png)
![enter image description here](https://i.imgur.com/Z0syHb8.png)![enter image description here](https://i.imgur.com/TDuWLxs.png)

- Complete a task

![enter image description here](https://i.imgur.com/CKOPz1h.png)![enter image description here](https://i.imgur.com/NOa0iKe.png)![enter image description here](https://i.imgur.com/3PjvdTi.png)![enter image description here](https://i.imgur.com/LrK80FH.png)

- Change task name
![enter image description here](https://i.imgur.com/Hh6etOs.png)
![enter image description here](https://i.imgur.com/MPvz5nc.png)![enter image description here](https://i.imgur.com/Vxx1U3K.png)

- show only uncompleted items

![enter image description here](https://i.imgur.com/Ryc0Vh4.png)
![enter image description here](https://i.imgur.com/IxnSvMC.png)
![enter image description here](https://i.imgur.com/i6bCodp.png)

- Delete all completed tasks

![enter image description here](https://i.imgur.com/3lBzTyL.png)
![enter image description here](https://i.imgur.com/Jb8Qxk1.png)
![enter image description here](https://i.imgur.com/D1toIql.png)
![enter image description here](https://i.imgur.com/V8XbRcbh.jpg)

- **Lab 2 Update:** The final design can be viewed at our github pages link
[here](asdfghjkl.zxcvnmn)

# Challenges you faced

-   Some challenges we faced includes everything described above in alternative designs, but also setting up the html webapp. Originally we wanted to create the html pages using a React application, but React would not work. When designing the webapp we also found ourselves getting into the, as described in don’t make me think, “religious debates” about which design choice was better. When this would occur, we’d generally fallback on what convention says, and this helped us greatly.

- **lab 2 update** The challenges faced during lab2 were very different from lab1. While most of the challenges faced in lab1 were either deciding on design decisions or working with the results of said decisions, lab2 required us to structure and plan ahead our React Webapp. Below is some of our planning in draw.io. 
			![first component diagram](https://i.imgur.com/3GUfETV.png)
	- Our First component diagram![Package diagram of finished app](https://i.imgur.com/TrFYQZJ.png)
	- Package diagram of finished app
	
	we also faced many problems implementing the different features. Some of these included making sure states updated when tasks were renamed, compiling errors resulting from learning React Redux, many Css problems transferring Lab 1's source to a React app, and more. 

# Parts of the design you're most proud of


-   I think the design part I’m most proud of is the color palette as well as the menu button. The color palette was sourced from coolors.co, specifically [https://coolors.co/fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a](https://coolors.co/fec5bb-fcd5ce-fae1dd-f8edeb-e8e8e4-d8e2dc-ece4db-ffe5d9-ffd7ba-fec89a)
    
-   The plus button I think was a great way to chunk together the actions the user can take as well as preventing the user from accidentally making incorrect decisions.
- **Lab 2 update** I think the parts of the design we're most proud of is the undo button we implemented. While  we didn't necessarily need an undo button and the app worked fine without it, it does add user forgiveness. This meant implementing a stack to keep track of our cleared tasks which could be re added to our taskList. I'm also very happy it just works, and I think I'm most proud of that as well. 
