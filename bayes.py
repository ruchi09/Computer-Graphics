
import pprint
import pygame
import random
import thread
from math import ceil

R = 0
G = 1
B = 2
width = 50
height = 30
block_width=10
block_height=10
#
# width = 400
# height = 300
# block_width=2
# block_height=2


# Define some colors
BLACK = [0, 0, 0]
WHITE = [255, 255, 255]
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = [0, 0, 255]

pygame.init()



def display_image(image,image_height,image_width,caption):
    # Set the width and height of the screen [width, height]
    size = (700, 500)
    screen = pygame.display.set_mode(size)

    pygame.display.set_caption(caption)

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
        x=50
        y=0
        for i in range (0,image_height):
            x=10
            y=y+block_height
            for j in range (0,image_width):
                pygame.draw.rect(screen, image[i][j], [x,y,block_width,block_height])
                x=x+block_width

        # --- Go ahead and update the screen with what we've drawn.
        pygame.display.flip()
        # --- Limit to 60 frames per second
        clock.tick(60)
    # Close the window and quit.
    pygame.quit()


# def disp_image(image,lock_size):


def demosaic(image):
    mosiaced_image=[[ [] for col in range(width-2)] for row in range(height-2)]
    #print "hideskf"
    for i in range(1,height-1):
        #print "dwwwwwhi"
        for j in range(1,width-1):
            #print mosiaced_image[i-1][j-1], i,j,"hi00000"
            if i%2 !=0:
                if j%2 != 0:
                    mosiaced_image[i-1][j-1].insert(R,(image[i-1][j-1]+image[i+1][j-1]+image[i-1][j+1]+image[i+1][j+1])/4)
                    mosiaced_image[i-1][j-1].insert(G,(image[i-1][j]+image[i][j-1]+image[i][j+1]+image[i+1][j])/4)
                    mosiaced_image[i-1][j-1].insert(B,image[i][j])
                    # print mosiaced_image[i-1][j-1], i,j,"hi"
                else:
                    mosiaced_image[i-1][j-1].insert(R, (image[i-1][j]+image[i+1][j])/2)
                    mosiaced_image[i-1][j-1].insert(G, (image[i-1][j-1]+image[i+1][j-1]+image[i-1][j+1]+image[i+1][j+1]+image[i][j])/5)
                    mosiaced_image[i-1][j-1].insert(B, (image[i][j-1]+image[i][j+1])/2)
                    # print mosiaced_image[i-1][j-1], i,j,"hi2"
            else:
                if j%2 == 0:
                    mosiaced_image[i-1][j-1].insert(R, image[i][j])
                    mosiaced_image[i-1][j-1].insert(G, (image[i-1][j]+image[i][j-1]+image[i][j+1]+image[i+1][j])/4)
                    mosiaced_image[i-1][j-1].insert(B,(image[i-1][j-1]+image[i+1][j-1]+image[i-1][j+1]+image[i+1][j+1])/4)

                    # print mosiaced_image[i-1][j-1], i,j,"hi3"
                else:
                    mosiaced_image[i-1][j-1].insert(R, (image[i][j-1]+image[i][j+1])/2)
                    mosiaced_image[i-1][j-1].insert(G, (image[i-1][j-1]+image[i+1][j-1]+image[i-1][j+1]+image[i+1][j+1]+image[i][j])/5)
                    mosiaced_image[i-1][j-1].insert(B, (image[i-1][j]+image[i+1][j])/2)

                    #print mosiaced_image[i-1][j-1], i,j,"hi4"

    #pprint.pprint(mosiaced_image)
    display_image(mosiaced_image,height-2,width-2,"demosiaced_image....(close this window to move to next one)")





if __name__ == '__main__':


    #------------------------- Displaying the filter used
    bayes_filter=[[ [0 for x in range(3)] for col in range(width)] for row in range(height)]
    #pprint.pprint(bayes_filter)

    for i in range(0,height):
        for j in range(0,width):
        #    print i,j
            if i%2==0:
                if j%2==0:
                    bayes_filter[i][j] = RED
                else:
                    bayes_filter[i][j] = GREEN

            else:
                if j%2==0:
                    bayes_filter[i][j] = GREEN
                else:
                    bayes_filter[i][j] = BLUE


    #pprint.pprint(bayes_filter)
    display_image(bayes_filter,height,width,"Baye's Filter....(close this window to move to next one)")



    #--------------------- forming and displaying the image/intensity captured-------------------------------
    captured_image=[[ [0 for x in range(3)] for col in range(width)] for row in range(height)]
    captured_image_intesities = [[ random.randint(1,255) for col in range(width)] for row in range(height)]
    #pprint.pprint(bayes_filter)

    for i in range(0,height):
        for j in range(0,width):
            #print i,j
            if i%2==0:
                if j%2==0:
                    captured_image[i][j] = (captured_image_intesities[i][j],0,0)
                else:
                    captured_image[i][j] = (0,captured_image_intesities[i][j],0)

            else:
                if j%2==0:
                    captured_image[i][j] = (0,captured_image_intesities[i][j],0)
                else:
                    captured_image[i][j] = (0,0,captured_image_intesities[i][j])

    display_image(captured_image,height,width,"captured_intensities....(close this window to move to next one)")


#--------- applying demosiacing the image---------------------------------------------------------------

    demosaic(captured_image_intesities)
