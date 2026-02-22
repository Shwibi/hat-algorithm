<!-- @format -->

# Hat alogirthm

I did not come up with any solutions, watch this video: https://www.youtube.com/watch?v=6hVPNONm7xw

This code is just implementation of what Going Null explained in their video.
I did manage to come up with the n=2 one by myself, but (as is painfully obvious) got lost at n = 3.

## Dependencies

It does use `shwi-js` as a dependency for getting random items out of a filtered array, but the general algorithm does not use it. You can easily just remove the dependency and remove the algorithms which do use the `shwijs.Random()` function and it will work.

## Disclaimer

For n > 5, it is incredibly slow, so I recommend sticking to n = 5 or lower. It's about $O(n^n)$ for both time and space, maybe even more.

I don't know how to precisely calculate that yet, but when I put this logic into an AI and asked it about the time complexity it told me it's about $O(n^{n+2})$ for time and $O(n^{n+1})$ for space.
