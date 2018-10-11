

import pygame
from math import ceil

# Define some colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = (0, 0, 255)

pygame.init()

def plot_circle(cx,cy,x,y,screen):

    # print "plotting",cx,cy,x,y
    screen.set_at((cx+x, cy+y), GREEN)
    screen.set_at((cx+x, cy-y), GREEN)
    screen.set_at((cx-x, cy+y), GREEN)
    screen.set_at((cx-x, cy-y), GREEN)

    screen.set_at((cx+y, cy+x), GREEN)
    screen.set_at((cx+y, cy-x), GREEN)
    screen.set_at((cx-y, cy+x), GREEN)
    screen.set_at((cx-y, cy-x), GREEN)




def draw_circle_bresenham(cx,cy,r,screen):
    x=0
    y=r
    d=3-2*r
    screen.set_at((cx, cy), RED)
    while y>=x:
        plot_circle(cx,cy,x,y,screen)
        x+=1
        if d>0:
            y=y-1
            d=d+4*(x-y)+10
        else:
            d=d+ 4*x+6






if __name__ == '__main__':

    # Set the width and height of the screen [width, height]
    size = (700, 500)
    screen = pygame.display.set_mode(size)

    pygame.display.set_caption("My Game")

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

        draw_circle_bresenham(300,300,100,screen)

        # --- Go ahead and update the screen with what we've drawn.
        pygame.display.flip()

        # --- Limit to 60 frames per second
        clock.tick(60)

    # Close the window and quit.
    pygame.quit()
