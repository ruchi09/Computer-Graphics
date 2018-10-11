

import pygame
from math import ceil

# Define some colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = (0, 0, 255)

pygame.init()


def draw_line_bresenham(x1,y1,x2,y2,screen):

    dy = y2-y1
    dx = x2-x1
    x=x1
    y=y1
    p = 2*dy - dx


    while x<=x2:
        screen.set_at((x, y), WHITE)
        x=x+1
        if p < 0:
            p=p+dy+dy
        else:
            p=p+dy+dy-dx-dx
            y=y+1
    screen.set_at((x1,y1), RED)
    screen.set_at((x2, y2), RED)


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


        draw_line_bresenham(200,50,320,80,screen)


        # --- Go ahead and update the screen with what we've drawn.
        pygame.display.flip()

        # --- Limit to 60 frames per second
        clock.tick(60)

    # Close the window and quit.
    pygame.quit()
