

import pygame
from math import ceil

# Define some colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = (0, 0, 255)

pygame.init()




def draw_line_dod(x1,y1,x2,y2,screen):
    m = (y2-y1*1.0)/(x2-x1);

    x=x1
    y=y1
    #print "in draw_line",m
    if m<1 and m>-1:
        #print "........."
        if(x1>x2):
            x=x2
            x2=x1
        while x<=x2:
            screen.set_at((x, int(y)), RED)
            x=x+1
            y=y+m

    elif m>=1 or m<-1:
        m=1.0/m
        if y1>y2:
            y=y2
            y2=y1
        while y<=y2:
            screen.set_at((int(x), y), RED)
            y=y+1
            x=x+m

    screen.set_at((x1,y1), BLUE)
    screen.set_at((x2, y2), BLUE)







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

        draw_line_dod(200,70,320,100,screen)


        # --- Go ahead and update the screen with what we've drawn.
        pygame.display.flip()

        # --- Limit to 60 frames per second
        clock.tick(60)

    # Close the window and quit.
    pygame.quit()
