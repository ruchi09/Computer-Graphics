# ----------------------------------------------------------------------------------------------------------
#
# Program Written By: Ruchi Saha (CED15I023)
# Description: The program illustrates zooming
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
circle_center = (350,350)
screen_size = (830, 700)

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



def zoom(factor):
    zoom_points = set()
    for i in circle_points:
        x,y=i
        x1 = int(x*factor - factor*circle_center[0] + circle_center[0])
        y1 = int (y*factor - factor * circle_center[1] + circle_center[1])
        zoom_points.add((x1,y1))

    text = "After Zooming " + str(factor) + "X"
    plot_circle(zoom_points, GREEN, text, BLUE)
    pygame.time.delay(700)
    plot_circle(zoom_points, BLACK, text, BLACK)


if __name__ == '__main__':


        screen = pygame.display.set_mode(screen_size)

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


            pygame.time.delay(1000)
            zoom(1.5)
            zoom(2)
            zoom(3)
            zoom(4)

            # --- Go ahead and update the screen with what we've drawn.
            pygame.display.flip()

            # --- Limit to 60 frames per second
            clock.tick(60)

        # Close the window and quit.
        pygame.quit()
