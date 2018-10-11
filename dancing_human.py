# ----------------------------------------------------------------------------------------------------------
#
# Program Written By: Ruchi Saha (CED15I023)
# Description: The program illustrates a simple animation in pygame
#
# ----------------------------------------------------------------------------------------------------------

import pygame
# import thread
# import math


BLACK = [0, 0, 0]
WHITE = [255, 255, 255]
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = [0, 0, 255]

colours = [BLACK, RED, BLUE, GREEN, WHITE]



def dance():
    #drawing head
    pygame.draw.circle(screen,RED,(350,150),20,1)

    #waist
    x1 = 350
    y1 = 230

    # right elbow joint
    x2 = 320
    y2 = 185

    # left elbow joint
    x3 = 410
    y3 = 185

    x_left_foot = 320
    y_left_foot = 300

    x_right_foot = 370
    y_right_foot = 300

    flag=0

    while 1:

        pygame.draw.line(screen,GREEN,(350,170),(350,180),1) # drawing neck
        pygame.draw.line(screen,GREEN,(350,180),(x1,y1),1)   # main body
        pygame.draw.line(screen,GREEN,(x_left_foot,y_left_foot),(x1,y1),1)  # left leg
        pygame.draw.line(screen,GREEN,(x_right_foot,y_right_foot),(x1,y1),1)  # right leg
        pygame.draw.line(screen,GREEN,(350,180),(320,y2),1)  # right arm
        pygame.draw.line(screen,GREEN,(320,y2),(290,175),1)  # right hand
        pygame.draw.line(screen,GREEN,(350,180),(380,y3),1) # left arm
        pygame.draw.line(screen,GREEN,(380,y3),(410,175),1) # left hand

        pygame.display.flip() #update the screen

        pygame.time.delay(7)

        pygame.draw.line(screen,BLACK,(350,170),(350,180),1) # erasing neck
        pygame.draw.line(screen,BLACK,(350,180),(x1,y1),1)  # erasing body
        pygame.draw.line(screen,BLACK,(x_left_foot,y_left_foot),(x1,y1),1)  # erasing left leg
        pygame.draw.line(screen,BLACK,(x_right_foot,y_right_foot),(x1,y1),1)  # erasing leg
        pygame.draw.line(screen,BLACK,(350,180),(320,y2),1)  # erasing right arm
        pygame.draw.line(screen,BLACK,(320,y2),(290,175),1)  # erasing right hand
        pygame.draw.line(screen,BLACK,(350,180),(380,y3),1)  # erasing left arm
        pygame.draw.line(screen,BLACK,(380,y3),(410,175),1)  # erasing left hand

        pygame.display.flip() #update the screen

        if flag==0:
            x1 = x1 + 1
            if x1%2==0:
                y2= y2+1
                y3 = y3-1
            if x1>= 380:
                flag=1
        else:
            x1=x1-1
            if x1%2==0:
                y2 = y2-1
                y3=y3+1
            if x1<=330:
                flag=0





if __name__ == '__main__':

        size = (700, 500)
        screen = pygame.display.set_mode(size)

        pygame.display.set_caption("Levy's C curve")

        # Loop until the user clicks the close button.
        done = False

        # Used to manage how fast the screen updates
        clock = pygame.time.Clock()

        # -------- Main Program Loop -----------
        while not done:
            # --- Main event loop
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    done = True


            #------ Code ------------------------------------------


            dance()

            # --- Go ahead and update the screen with what we've drawn.
            pygame.display.flip()

            # --- Limit to 60 frames per second
            clock.tick(60)

        # Close the window and quit.
        pygame.quit()
