

# ----------------------------------------------------------------------------------------------------------
#
# Program Written By: Ruchi Saha (CED15I023)
# Description: This program shows the formation of the koch snowflake.
#              It takes No of levels (say n) as input and shows the flakes from
#              level 0 to n.
# ----------------------------------------------------------------------------------------------------------


import pygame
import thread
import math


# Define some colors
BLACK = [0, 0, 0]
WHITE = [255, 255, 255]
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = [0, 0, 255]

colours = [BLACK, RED, BLUE, GREEN, WHITE]

pygame.init()


def snow_flake(x1,y1,x2,y2,color,n,delay):
    if(n>0):

        # print "ewf", (x2+x1)/3, x1,x2
        x_mid = (x2+x1)/2
        y_mid = (y2+y1)/2
        x_one_third = math.ceil(x1+ (x2-x1)/3)
        # print x_one_third
        y_one_third = math.ceil(y1+ (y2-y1)/3)
        y_two_third = math.ceil(y1+2* (y2-y1)/3)
        x_two_third = math.ceil(x2- (x2-x1)/3)
        # Here a is the slope of the graph
        a = (y2-y1)*1.0/(x2-x1)

        # hypot function gives the eucledian distance
        l = math.hypot(x_one_third - x1, y_one_third - y1)
        alpha = math.degrees(math.atan(a))


        #------------------------- calculating the coordinates of flake peak
        if a>0 and a<=1:

            if x1>x2:
                print "in first 1"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha-90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha-90)))

            else:
                print "in first 2"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha+90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha+90)))

        elif a>1:

            if x1>x2:
                print "in second 1"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha-90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha-90)))

            else:
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha+90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha+90)))
                print "in second 2"


        elif a<0 and a>-1:

            if x1>x2:
                print "in third 1"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha-90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha-90)))

            else:
                print "in third 2"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha+90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha+90)))


        elif a==0:
            if x1>x2:
                print "in a=0 1"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha-90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha-90)))

            else:
                print "in a=0 2"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha+90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha+90)))



        else:
            if x1>=x2:
                print "in fourth 1",

                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha-90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha-90)))

            else:
                print "in fourth 2"
                x_flake =x_mid+ math.ceil( l* math.cos(math.radians(alpha+90)))
                y_flake = y_mid+math.ceil( l* math.sin(math.radians(alpha+90)))



        # repeat on the so formed four line segments
        snow_flake(x1,y1,x_one_third,y_one_third,color,n-1,delay)
        snow_flake(x_one_third,y_one_third,x_flake,y_flake,color,n-1,delay)
        snow_flake(x_flake,y_flake,x_two_third,y_two_third,color,n-1,delay)
        snow_flake(x_two_third,y_two_third,x2,y2,color,n-1,delay)

    else:
        # print x1,y1,x2,y2
        pygame.draw.line(screen,colours[color],(x1,y1),(x2,y2),1)
        pygame.time.wait(delay)
        pygame.display.flip()



def koch_snowflake(n):

    # making an equilateral triangle with vertices (x1,x2), (x2,y2), (x3,y3)
    x_start = 220
    y_start = 300
    len_triangle = 200
    x1 = x_start
    y1 = y_start
    x2 = x_start+len_triangle
    y2 = y_start
    l3 = math.hypot(x2-x1,y2-y1)
    x3 = (x1+x2)/2
    y3 = y1-math.ceil(l3* math.sin(math.radians(60)))

    # defining font
    font = pygame.font.SysFont("comicsansms", 30)


    #------------ koch_snowflake for n=0-----------------
    text = font.render("N = 0", True, RED)
    screen.blit(text, (50, 380))

    snow_flake(x1,y1,x2,y2,1,0,150)
    snow_flake(x2,y2,x3,y3,1,0,150)
    snow_flake(x3,y3,x1,y1,1,0,150)



    #------------ now making koch_snowflake for n=1 to specifite limit-------------------
    for i in range (1,n+1):

        pygame.time.wait(100)
        cap="N = "+ str(i-1)
        text = font.render(cap, True, (0, 0, 0))
        screen.blit(text, (50, 380))

        cap="N = "+ str(i)
        text = font.render(cap, True, colours[((i)% (len(colours)-1))+1])
        screen.blit(text, (50, 380))



        snow_flake(x1,y1,x2,y2,0,i-1,0)
        snow_flake(x2,y2,x3,y3,0,i-1,0)
        snow_flake(x3,y3,x1,y1,0,i-1,0)

        snow_flake(x1,y1,x2,y2,((i)% (len(colours)-1))+1,i, 90-i*22 )
        snow_flake(x2,y2,x3,y3,((i)% (len(colours)-1))+1,i, 90-i*22 )
        snow_flake(x3,y3,x1,y1,((i)% (len(colours)-1))+1,i, 90-i*22 )

    #------------------removing the last made koch_snowflake-----------------------------
    pygame.time.wait(100)
    snow_flake(x1,y1,x2,y2,0,n,0)
    snow_flake(x2,y2,x3,y3,0,n,0)
    snow_flake(x3,y3,x1,y1,0,n,0)





if __name__ == '__main__':

        size = (700, 500)
        screen = pygame.display.set_mode(size)

        pygame.display.set_caption("Koch Snowflake")

        # Loop until the user clicks the close button.
        done = False

        font = pygame.font.SysFont("comicsansms", 30)



        # Used to manage how fast the screen updates
        clock = pygame.time.Clock()

        # -------- Main Program Loop -----------
        while not done:
            # --- Main event loop
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    done = True


            #------ Code ------------------------------------------

            # call the function specifying limit n
            koch_snowflake(4)

            # --- Go ahead and update the screen with what we've drawn.
            pygame.display.flip()

            # --- Limit to 60 frames per second
            clock.tick(60)

        # Close the window and quit.
        pygame.quit()
