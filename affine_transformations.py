# ----------------------------------------------------------------------------------------------------------
#
# Program Written By: Ruchi Saha (CED15I023)
# Description: The program illustrates affine transformations (transition, rotation, scaling reflection)
#
# ----------------------------------------------------------------------------------------------------------

import pygame
import math

BLACK = [0, 0, 0]
WHITE = [255, 255, 255]
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = [0, 0, 255]
GREY = [50,50,50]

origin = (400,400)
circle_center = (200,200)

circle_points = set() # stores the coordinates belonging to a circle
pygame.init()

def plot_circle(point_set,color,title,text_color):
    for i in point_set:
        screen.set_at(i, color)


    text = font.render(title, True, text_color)
    screen.blit(text, (50, 20))
    pygame.display.flip()



def add_circle_points(cx,cy,x,y):

    circle_points.add((cx+x, cy+y))
    circle_points.add((cx+x, cy-y))
    circle_points.add((cx-x, cy+y))
    circle_points.add((cx-x, cy-y))

    circle_points.add((cx+y, cy+x))
    circle_points.add((cx+y, cy-x))
    circle_points.add((cx-y, cy+x))
    circle_points.add((cx-y, cy-x))



def draw_circle(cx,cy,r):
    x=0
    y=r
    d=3-2*r
    while y>=x:
        add_circle_points(cx,cy,x,y)
        x+=1
        if d>0:
            y=y-1
            d=d+4*(x-y)+10
        else:
            d=d+ 4*x+6



def transition(h,k):
    tran_set = set()
    for i in circle_points:
        tran_set.add((i[0]+h,i[1]+k))
    plot_circle(tran_set,GREEN,"Transition",BLUE)
    pygame.time.delay(1500)
    plot_circle(tran_set,GREY,"Transition",BLACK)



def rotation(a):
    rot_set = set()
    for i in circle_points:
        x,y = i
        x1 = (int) (x * math.cos(math.radians(a)) - y * math.sin(math.radians(a)))
        y1 = (int) (x * math.sin(math.radians(a)) + y * math.cos(math.radians(a)))
        rot_set.add((x1,y1))
    plot_circle(rot_set,GREEN,"Rotation",BLUE)
    pygame.time.delay(1500)
    plot_circle(rot_set,GREY,"Rotation",BLACK)


def scaling(factor):
    rot_set = set()
    for i in circle_points:
        x,y = i
        x1 = int(x*factor)
        y1 = int(y*factor)
        rot_set.add((x1,y1))
    plot_circle(rot_set,GREEN,"Scaling",BLUE)
    pygame.time.delay(1500)
    plot_circle(rot_set,GREY,"Scaling",BLACK)


def reflection(axis):
    if axis == "x":
        pygame.draw.line(screen,RED,(origin[0],0),(origin[0],700),1)
        rot_set = set()
        for i in circle_points:
            x,y = i
            x1 = x + 2*(origin[0] - circle_center[0])
            y1 = y
            rot_set.add((x1,y1))
    elif axis == "y":
        pygame.draw.line(screen,RED,(0,origin[1]),(830,origin[1]),1)
        rot_set = set()
        for i in circle_points:
            x,y = i
            x1 = x
            y1 = y+ 2*(origin[0] - circle_center[1])
            rot_set.add((x1,y1))

    else:
        print("\n Wrong axis arguments!!")
        return

    plot_circle(rot_set,GREEN, "Reflection", BLUE)
    pygame.time.delay(1500)
    plot_circle(rot_set,GREY,"Reflection",BLACK)






if __name__ == '__main__':

        size = (830, 700)
        screen = pygame.display.set_mode(size)

        pygame.display.set_caption("Affine transformations")

        # Loop until the user clicks the close button.
        done = False
        font = pygame.font.SysFont("comicsansms", 40)

        # Used to manage how fast the screen updates
        clock = pygame.time.Clock()

        # -------- Main Program Loop -----------
        while not done:
            # --- Main event loop
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    done = True


            #------ Code ------------------------------------------

            
            draw_circle(circle_center[0],circle_center[1],50)
            plot_circle(circle_points,GREEN,"",BLACK)

            pygame.time.delay(700)
            transition(400,100)

            pygame.time.delay(1000)
            rotation(330)

            pygame.time.delay(1000)
            scaling(2)

            pygame.time.delay(1000)
            reflection("y")

            pygame.time.delay(1000)
            screen.fill(BLACK)

            # --- Go ahead and update the screen with what we've drawn.
            pygame.display.flip()

            # --- Limit to 60 frames per second
            clock.tick(60)

        # Close the window and quit.
        pygame.quit()
